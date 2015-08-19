var config = require(WPATH('config'));
Widget.Models.powerbar = Widget.createModel('powerbar');
var timer = null;

$.main.height = config.height;
$.main.backgroundColor = config.backgroundColor;
$.leftLabel.color = config.left.color;
$.leftBarView.backgroundColor = config.left.barColor;
$.rightLabel.color = config.right.color;
$.rightBarView.backgroundColor = config.right.barColor;

$.leftView.width = parseInt(Ti.Platform.displayCaps.platformWidth * 0.25);
$.centerView.width = parseInt(Ti.Platform.displayCaps.platformWidth * 0.5);
$.rightView.width = parseInt(Ti.Platform.displayCaps.platformWidth * 0.25);

$.leftBarView.width = $.centerView.width;
$.rightBarView.width = $.centerView.width;

function setLeftValue(value) {
    // 0 -------> 1
    var percentLeft = value * (100 / 1);
    var percentRight = 100 - percentLeft;

    Widget.Models.powerbar.set({
        leftvalue : percentLeft,
        rightvalue : percentRight
    });
    Widget.Models.powerbar.save();
    Widget.Models.powerbar.fetch();

    var data = Widget.Models.powerbar.toJSON();

    config.left.value = data.leftvalue;
    config.right.value = data.rightvalue;

    $.leftLabel.text = data.leftvalue.toFixed(2) + '%';
    $.rightLabel.text = data.rightvalue.toFixed(2) + '%';
    $.rightBarView.width = parseInt(data.rightvalue * ($.centerView.width / 100));

    $.centerBarView.transform = Ti.UI.create2DMatrix().rotate(45);

    if (percentLeft === 50) {
        $.centerBarView.visible = false;
    } else if (percentLeft > 50) {
        $.centerBarView.visible = true;
        $.centerBarView.backgroundColor = $.leftBarView.backgroundColor;
    } else if (percentLeft < 50) {
        $.centerBarView.visible = true;
        $.centerBarView.backgroundColor = $.rightBarView.backgroundColor;
    }

    $.centerBarView.left = parseInt(data.leftvalue * ($.centerView.width / 100)) - 6;
};

function setRightValue(value) {
    // 1 <------- 0
    var percentRight = value * (100 / 1);
    var percentLeft = 100 - percentRight;

    Widget.Models.powerbar.set({
        leftvalue : percentLeft,
        rightvalue : percentRight
    });
    Widget.Models.powerbar.save();
    Widget.Models.powerbar.fetch();

    var data = Widget.Models.powerbar.toJSON();

    config.left.value = data.leftvalue;
    config.right.value = data.rightvalue;

    $.leftLabel.text = data.leftvalue.toFixed(2) + '%';
    $.rightLabel.text = data.rightvalue.toFixed(2) + '%';
    $.rightBarView.width = parseInt(data.rightvalue * ($.centerView.width / 100));

    $.centerBarView.transform = Ti.UI.create2DMatrix().rotate(45);

    if (percentLeft === 50) {
        $.centerBarView.visible = false;
    } else if (percentLeft > 50) {
        $.centerBarView.visible = true;
        $.centerBarView.backgroundColor = $.leftBarView.backgroundColor;
    } else if (percentLeft < 50) {
        $.centerBarView.visible = true;
        $.centerBarView.backgroundColor = $.rightBarView.backgroundColor;
    }

    $.centerBarView.left = parseInt(data.leftvalue * ($.centerView.width / 100)) - 6;
};

exports.startTest = function(duration) {
    var chance = require('chance.min'),
        chance = new chance();

    run();

    timer = setInterval(function() {
        run();
    }, duration);

    function run() {
        var random = _.random(0, 1);

        if (random === 1) {
            setLeftValue(chance.floating({
                min : 0,
                max : 1,
                fixed : 7
            }));
        } else {
            setRightValue(chance.floating({
                min : 0,
                max : 1,
                fixed : 7
            }));
        }
    };
};

exports.stopTest = function() {
    clearInterval(timer);
    timer = null;
};

exports.setLeftValue = function(value) {
    setLeftValue(value);
};

exports.setRightValue = function(value) {
    setRightValue(value);
};

exports.getLeftValue = function() {
    return global.leftValue;
};

exports.getRightValue = function() {
    return global.rightValue;
};
