var TRACE = 1;
var DEBUG = 2;
var INFO = 4;
var WARN = 8;
var ERROR = 16;
var ALL = TRACE | DEBUG | INFO | WARN | ERROR;

var enebled = false;
var logLevel = ALL;

function log(level, message) {
    if (!enebled) {
        return;
    }

    if ((logLevel & level) == TRACE) {
        showLog(TRACE, message);
    }

    if ((logLevel & level) == DEBUG) {
        showLog(DEBUG, message);
    }

    if ((logLevel & level) == INFO) {
        showLog(INFO, message);
    }

    if ((logLevel & level) == WARN) {
        showLog(WARN, message);
    }

    if ((logLevel & level) == ERROR) {
        showLog(ERROR, message);
    }
};

function showLog(level, message) {
    switch(level) {
    case TRACE:
        Ti.API.trace(message);

        break;
    case DEBUG:
        Ti.API.debug(message);

        break;
    case INFO:
        Ti.API.info(message);

        break;
    case WARN:
        Ti.API.warn(message);

        break;
    case ERROR:
        Ti.API.error(message);

        break;
    };
};

exports.TRACE = TRACE;
exports.DEBUG = DEBUG;
exports.INFO = INFO;
exports.WARN = WARN;
exports.ERROR = ERROR;
exports.ALL = ALL;

exports.off = function() {
    enebled = false;
};

exports.on = function() {
    enebled = true;
};

exports.getLevel = function() {
    return logLevel;
};

exports.setLevel = function(value) {
    logLevel = value;
};

exports.info = function(message) {
    log(INFO, message);
};

exports.warn = function(message) {
    log(WARN, message);
};

exports.debug = function(message) {
    log(DEBUG, message);
};

exports.error = function(message) {
    log(ERROR, message);
};

exports.trace = function(message) {
    log(TRACE, message);
};
