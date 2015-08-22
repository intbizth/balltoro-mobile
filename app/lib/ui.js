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
    }
};

for (var i in _exports) {
    exports[i] = _exports[i];
};

