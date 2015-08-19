var config = {
    debug : true,
    console : {
        load : false,
        error : false,
        sendstream : false,
        datastream : false,
    },
    timeout : 60000,
    headers : {
        APP : 'Balltoro'
    }
};
var session = creataSession();

if (config.debug) {
    Ti.API.debug('');
    Ti.API.debug(session, '->', 'Web Service startup');
    Ti.API.debug('');
}

var xhr = Ti.Network.createHTTPClient({
    timeout : config.timeout
});

function creataSession() {
    return new Date().getTime();
};

function isJSON(value) {
    try {
        var json = JSON.parse(value);
    } catch (e) {
        return false;
    }

    return true;
};

function callback(status, fn) {
    switch (status) {
    case 'success':
        xhr.onload = function(e) {
            if (config.debug) {
                Ti.API.debug('');
                Ti.API.debug(session, '->', 'Web Service [response <--]');
                Ti.API.debug(session, '->', 'Success');
                Ti.API.debug(session, '->', 'Response Text', ':', this.responseText, typeof this.responseText + '[' + ((_.isString(this.responseText)) ? this.responseText.length : 0) + ']');
            }

            var data = null;

            if (isJSON(this.responseText)) {
                data = JSON.parse(this.responseText);
            }

            fn(data);

            if (config.debug) {
                Ti.API.debug(session, '->', 'Data', ':', data, typeof data + '[' + ((_.isString(data)) ? data.length : 0) + ']');
                Ti.API.debug('');
            }
        };

        break;
    case 'error':
        xhr.onerror = function(e) {
            if (config.debug) {
                Ti.API.error('');
                Ti.API.error(session, '->', 'Web Service [response <--]');
                Ti.API.error(session, '->', 'Network Error');

                if (OS_ANDROID) {
                    Ti.API.error(session, '->', 'Error', typeof e, JSON.stringify(e));
                } else if (OS_IOS) {
                    Ti.API.error(session, '->', 'Error', typeof e, e);
                }

                Ti.API.error('');
            }

            if (OS_ANDROID) {
                if (!_.isUndefined(e.source) && !_.isUndefined(e.source.status)) {
                    e.code = e.source.status;
                }
            }

            fn(e);
        };

        break;
    case 'sendstream':
        xhr.onsendstream = function(e) {
            if (config.debug) {
                Ti.API.debug(session, '->', 'Web Service [sendstream <--]');

                if (OS_ANDROID) {
                    Ti.API.error(session, '->', 'Sendstream', typeof e, JSON.stringify(e));
                } else if (OS_IOS) {
                    Ti.API.debug(session, '->', 'Sendstream', typeof e, e);
                }
            }

            fn(e);
        };

        break;
    case 'datastream':
        xhr.ondatastream = function(e) {
            if (config.debug) {
                Ti.API.debug(session, '->', 'Web Service [datastream <--]');

                if (OS_ANDROID) {
                    Ti.API.error(session, '->', 'Datastream', typeof e, JSON.stringify(e));
                } else if (OS_IOS) {
                    Ti.API.debug(session, '->', 'Datastream', typeof e, e);
                }
            }

            fn(e);
        };

        break;
    };
}

function request(method, url, input) {
    if (_.isUndefined(method) || _.isUndefined(url)) {
        if (config.debug) {
            Ti.API.error('');
            Ti.API.error(session, '->', 'Web Service [request -->]');

            if (_.isUndefined(method)) {
                Ti.API.error(session, '->', 'Invalid method.');
            }

            if (_.isUndefined(url)) {
                Ti.API.error(session, '->', 'Invalid url.');
            }

            Ti.API.error('');
        }

        return;
    }

    if (config.debug) {
        Ti.API.debug('');
        Ti.API.debug(session, '->', 'Web Service [request -->]');
    }

    if (!_.isUndefined(input) && !_.isUndefined(input.body) && _.isObject(input.body)) {
        for (var i in input.body) {
            if (_.isNull(input.body[i])) {
                delete input.body[i];
            }
        }
    }

    if (method === 'GET' && !_.isUndefined(input) && !_.isUndefined(input.body) && _.isObject(input.body)) {
        var symbol = (link.indexOf('?') != -1) ? '&' : '?';
        var dataQuery = URI.buildget(input.body);
        dataQuery = (dataQuery.length > 0) ? symbol + dataQuery : '';
        url = url + dataQuery;
        delete input.body;
    }

    xhr.open(method, url);

    var headers = config.headers;

    if (!_.isUndefined(input) && !_.isUndefined(input.header) && _.isObject(input.header)) {
        headers = _.extend(input.header);
    }

    for (var name in headers) {
        xhr.setRequestHeader(name, headers[name]);

        if (config.debug) {
            Ti.API.debug(session, '->', 'Header', name, ':', headers[name]);
        }
    }

    if (config.debug) {
        Ti.API.debug(session, '->', 'Url', ':', url, typeof url + '[' + ((_.isString(url)) ? url.length : 0) + ']');
        Ti.API.debug(session, '->', 'Method', ':', method, typeof method + '[' + ((_.isString(method)) ? method.length : 0) + ']');

        if (!_.isUndefined(input) && !_.isUndefined(input.body)) {
            for (var i in input.body) {
                if (_.isString(input.body[i])) {
                    length = input.body[i].length;
                } else if (_.isObject(input.body[i])) {
                    length = input.body[i].size;
                } else {
                    length = 0;
                }

                Ti.API.debug(session, '->', 'Body', i, ':', input.body[i], typeof input.body[i] + '[' + length + ']');
            }
        }

        Ti.API.debug('');
    }

    if (!_.isUndefined(input) && !_.isUndefined(input.body) && _.isObject(input.body)) {
        xhr.send(input.body);
    } else {
        xhr.send();
    }

    return xhr;
};

exports.setTimeout = function(time) {
    session = creataSession();
    xhr.setTimeout(time);
};

exports.setHeader = function(name, value) {
    session = creataSession();
    xhr.setRequestHeader(name, value);
};

exports.abort = function() {
    session = creataSession();
    xhr.abort();
};

exports.get = function(url, data) {
    session = creataSession();
    return request('GET', url, data);
};

exports.post = function(url, data) {
    session = creataSession();
    return request('POST', url, data);
};

exports.put = function(url, data) {
    session = creataSession();
    return request('PUT', url, data);
};

exports.delete = function(url, data) {
    session = creataSession();
    return request('DELETE', url, data);
};

exports.success = function(fn) {
    session = creataSession();
    callback('success', fn);
};

exports.error = function(fn) {
    session = creataSession();
    callback('error', fn);
};

exports.sendstream = function(fn) {
    session = creataSession();
    callback('sendstream', fn);
};

exports.datastream = function(fn) {
    session = creataSession();
    callback('datastream', fn);
};
