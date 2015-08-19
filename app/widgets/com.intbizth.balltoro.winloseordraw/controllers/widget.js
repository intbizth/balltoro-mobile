var config = require(WPATH('config'));
var timer = null;

function createWin() {
    var view = Ti.UI.createView({
        width : config.width,
        height : config.height,
        backgroundColor : config.win.backgroundColor
    });

    var label = Ti.UI.createLabel({
        width : config.width,
        height : config.height,
        font : {
            fontSize : 10
        },
        color : config.win.color,
        text : L('com.intbizth.balltoro.winloseordraw.win'),
        textAlign : 'center'
    });

    view.add(label);

    return view;
};

function createDraw() {
    var view = Ti.UI.createView({
        width : config.width,
        height : config.height,
        backgroundColor : config.draw.backgroundColor
    });

    var label = Ti.UI.createLabel({
        width : config.width,
        height : config.height,
        font : {
            fontSize : 10
        },
        color : config.draw.color,
        text : L('com.intbizth.balltoro.winloseordraw.draw'),
        textAlign : 'center'
    });

    view.add(label);

    return view;
};

function createLose() {
    var view = Ti.UI.createView({
        width : config.width,
        height : config.height,
        backgroundColor : config.lose.backgroundColor
    });

    var label = Ti.UI.createLabel({
        width : config.width,
        height : config.height,
        font : {
            fontSize : 10
        },
        color : config.lose.color,
        text : L('com.intbizth.balltoro.winloseordraw.lose'),
        textAlign : 'center'
    });

    view.add(label);

    return view;
};

exports.startTest = function(duration, element) {
    run();

    timer = setInterval(function() {
        run();
    }, duration);

    function run() {
        element.removeAllChildren();

        var random = _.random(1, 10);

        for (var i = 1; i <= random; i++) {
            var random2 = _.random(0, 2);

            if (random2 === 0) {
                element.add(createWin());
            } else if (random2 === 1) {
                element.add(createLose());
            } else if (random2 === 2) {
                element.add(createDraw());
            }

            if (i < random) {
                element.add(Ti.UI.createView({
                    width : 2,
                    height : 1
                }));
            }
        }
    };
};

exports.stopTest = function(element) {
    clearInterval(timer);
    timer = null;

    element.removeAllChildren();
};

exports.createWin = function() {
    return createWin();
};

exports.createLose = function() {
    return createLose();
};

exports.createDraw = function() {
    return createDraw();
};
