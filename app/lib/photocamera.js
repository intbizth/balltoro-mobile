var maxWidth = 600;
var maxHeight = 600;
var imagefactory = require('ti.imagefactory');

function resizeKeepAspectRatioPercentage(blob, width, height, percentage) {
    if (width <= 0 || height <= 0 || percentage <= 0) {
        return blob;
    }

    var w = width * (percentage / 100);
    var h = height * (percentage / 100);

    return imagefactory.imageAsResized(blob, {
        width : w,
        height : h
    });
};

function resizeKeepAspectRatioNewWidth(blob, width, height, newWidth) {
    if (width <= 0 || height <= 0 || newWidth <= 0) {
        return blob;
    }

    var ratio = width / height;

    var w = newWidth;
    var h = newWidth / ratio;

    return imagefactory.imageAsResized(blob, {
        width : w,
        height : h
    });
};

function resizeKeepAspectRatioNewHeight(blob, width, height, newHeight) {
    if (width <= 0 || height <= 0 || newHeight <= 0) {
        return blob;
    }

    var ratio = width / height;

    var w = newHeight * ratio;
    var h = newHeight;

    return imagefactory.imageAsResized(blob, {
        width : w,
        height : h
    });
};

function resize(blob, width, height, newWidth, newHeight) {
    if (width <= 0 || height <= 0 || newWidth <= 0 || newHeight <= 0) {
        return blob;
    }

    var w = newHeight;
    var h = newHeight;

    return imagefactory.imageAsResized(blob, {
        width : w,
        height : h
    });
};

function resizePhoto(blob, width, height) {
    if (height > width) {
        if (height > maxHeight) {
            blob = resizeKeepAspectRatioNewHeight(blob, width, height, maxHeight);
        }
    } else if (width > height) {
        if (width > maxWidth) {
            blob = resizeKeepAspectRatioNewWidth(blob, width, height, maxWidth);
        }
    } else {
        if (width > maxWidth && height > maxHeight) {
            blob = resize(blob, width, height, maxWidth, maxHeight);
        }
    }

    return blob;
};

var _exports = {
    openPhotoGallery : function(callback) {
        Ti.Media.openPhotoGallery({
            allowEditing : true,
            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
            success : function(event) {
                var data = {
                    image : resizePhoto(event.media, event.cropRect.width, event.cropRect.height)
                };

                Ti.API.debug('[photocamera]', 'event:', event);

                callback.success(data);
            },
            error : function(error) {
                var data = {
                    code : error.code
                };

                callback.error(data);
            },
            cancel : function() {
                callback.cancel();
            }
        });
    },
    openCamera : function(callback) {
        Ti.Media.showCamera({
            allowEditing : true,
            mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
            success : function(event) {
                var data = {
                    image : resizePhoto(event.media, event.cropRect.width, event.cropRect.height)
                };

                Ti.API.debug('[photocamera]', 'event:', event);

                callback.success(data);
            },
            error : function(error) {
                var data = {
                    code : error.code
                };

                callback.error(data);
            },
            cancel : function() {
                callback.cancel();
            }
        });
    },
    message : function(code) {
        var message = L('camera.unexpectederror') + ' (' + code + ')';

        if (code == Ti.Media.NO_CAMERA) {
            message = L('camera.devicesdonotsupportthecamera');
        }

        return message;
    }
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
