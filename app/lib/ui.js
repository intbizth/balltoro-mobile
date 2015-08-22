var _exports = {
    setInActAndAct : function(object) {
        object.addEventListener('touchstart', function() {
            this.act();
        });

        object.addEventListener('touchmove', function() {
            this.fireEvent('touchstart');
        });

        object.addEventListener('touchend', function() {
            this.inAct();
        });

        object.addEventListener('touchcancel', function() {
            this.fireEvent('touchend');
        });
    },
    setTextFieldNormalAndError : function(object) {
        object.normal = function() {
            this.backgroundColor = this.backgroundColorNormal;
            this.color = this.colorNormal;
            this.borderColor = this.borderColorNormal;
        };

        object.error = function() {
            this.backgroundColor = this.backgroundColorError;
            this.color = this.colorError;
            this.borderColor = this.borderColorError;
        };

        object.addEventListener('focus', function() {
            this.normal();
        });
    }
};

for (var i in _exports) {
    exports[i] = _exports[i];
};

