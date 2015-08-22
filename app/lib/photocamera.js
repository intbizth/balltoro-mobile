function openPhotoGallery() {
    Ti.Media.openPhotoGallery({
        allowEditing : true,
        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
        success : function(event) {
            console.info(event);
        },
        cancel : function() {

        },
        error : function(error) {
            var message = L('camera.unexpectederror') + ' (' + error.code + ')';

            Alloy.Notifier.show({
                message : message,
                style : 'error',
                icon : '/images/notifications/image.png',
                duration : 3000
            });
        }
    });
};

function openCamera() {
    Ti.Media.showCamera({
        allowEditing : true,
        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
        success : function(event) {
            console.info(event);
        },
        cancel : function() {

        },
        error : function(error) {
            var message = '';

            if (error.code == Ti.Media.NO_CAMERA) {
                message = L('camera.devicesdonotsupportthecamera');
            } else {
                message = L('camera.unexpectederror') + ' (' + error.code + ')';
            }

            Alloy.Notifier.show({
                message : message,
                style : 'error',
                icon : '/images/notifications/camera.png',
                duration : 3000
            });
        }
    });
};