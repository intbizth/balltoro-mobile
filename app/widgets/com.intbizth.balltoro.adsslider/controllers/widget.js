$.template = {
    logo : false,
    page : false
};

function doScroll(e) {
    if (Widget.Collections.pages.length > 0) {
        for (var i in $.pagingControlSubView.children) {
            i = parseInt(i);

            $.pagingControlSubView.children[i].children[1].visible = !(i === e.currentPage);
        }
    }
};

function doClick(e) {
    e.url = e.source.dataURL;

    $.trigger('click', e);
};

function doDblclick(e) {
    e.url = e.source.dataURL;

    $.trigger('dblclick', e);
};

function transformDataSlider(model) {
    var attrs = model.toJSON();

    for (var i in $.template) {
        $.template[i] = (i === attrs.template);
    }

    return attrs;
};

function showPagingControl() {
    $.pagingControl.visible = !(Widget.Collections.pages.length === 1);

    if (Widget.Collections.pages.length > 0) {
        $.pagingControlSubView.children[0].children[1].visible = false;
    }
};

function initialize() {
    $.main.height = parseInt(Ti.Platform.displayCaps.platformHeight - 160);

    if (Alloy.Globals.isIos7Plus) {
        $.main.height -= 20;
    }

    showPagingControl();
};

var _exports = {
    addData : function(values) {
        if (!values) {
            values = [];
        }

        Widget.Collections.pages.addData(values);
        showPagingControl();
    },
    load : function() {
        Widget.Collections.pages.addData([]);
        showPagingControl();
    }
};

initialize();

for (var i in _exports) {
    exports[i] = _exports[i];
};
