$.title.width = Ti.Platform.displayCaps.platformWidth - 140;

$.titleView.addEventListener('click', function(e) {
    $.trigger('title:click', e);
});

$.titleView.addEventListener('dblclick', function(e) {
    $.trigger('title:dblclick', e);
});

$.leftView.addEventListener('click', function(e) {
    $.trigger('left:click', e);
});

$.leftView.addEventListener('dblclick', function(e) {
    $.trigger('left:dblclick', e);
});

$.leftView.addEventListener('touchstart', function() {
    this.children[0].opacity = this.children[0].opacityAct;
});

$.leftView.addEventListener('touchmove', function() {
    this.fireEvent('touchstart');
});

$.leftView.addEventListener('touchend', function() {
    this.children[0].opacity = this.children[0].opacityInAct;
});

$.leftView.addEventListener('touchcancel', function() {
    this.fireEvent('touchend');
});

$.rightView.addEventListener('click', function(e) {
    $.trigger('right:click', e);
});

$.rightView.addEventListener('dblclick', function(e) {
    $.trigger('right:dblclick', e);
});

$.rightView.addEventListener('touchstart', function() {
    this.children[0].opacity = this.children[0].opacityAct;
});

$.rightView.addEventListener('touchmove', function() {
    this.fireEvent('touchstart');
});

$.rightView.addEventListener('touchend', function() {
    this.children[0].opacity = this.children[0].opacityInAct;
});

function transformData(value) {
    var fields = ['leftIcon', 'rightIcon'];

    for (var i in fields) {
        if (value[fields[i]]) {
            value[fields[i]] = WPATH('images/' + value[fields[i]] + '.png');
        }
    }

    return value;
};

function setData(value) {
    value = transformData(value);
    $.navbar.set(value);

    Ti.API.debug('[' + Widget.widgetId + ']', 'setdata:navbar:', JSON.stringify($.navbar.toJSON()));
};

var _exports = {
    setData : function(value) {
        setData(value);
    }
};

for (var i in _exports) {
    exports[i] = _exports[i];
};
