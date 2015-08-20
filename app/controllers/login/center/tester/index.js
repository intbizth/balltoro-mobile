var loaded = false;
var openedWindow = false;

function initialize() {
    if (Alloy.Globals.isIos7Plus) {
        $.navbarView.getView().top = 20;
    }

    $.navbarView.setData({
        id : 'login.menu.tester',
        title : L('login.menu.tester')
    });

    $.main.addEventListener('open', function(e) {
        Alloy.Globals.login.stackWindows.push($.main);

        var log = '[' + $.main.name + '] ';
        log += e.type;
        log += ' ';
        log += '(';
        log += ' login stacks: ';
        log += JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name'));
        log += ' ';
        log += Alloy.Globals.login.stackWindows.length;
        log += ')';

        Alloy.Logger.debug(log);
    });

    $.main.addEventListener('close', function(e) {
        Alloy.Globals.login.stackWindows.pop();

        var log = '[' + $.main.name + '] ';
        log += e.type;
        log += ' ';
        log += '(';
        log += ' login stacks: ';
        log += JSON.stringify(_.pluck(Alloy.Globals.login.stackWindows, 'name'));
        log += ' ';
        log += Alloy.Globals.login.stackWindows.length;
        log += ')';

        Alloy.Logger.debug(log);
    });
};

function load() {
    Alloy.Logger.debug('[' + $.main.name + '] load');

    loaded = true;
    openedWindow = false;

    // $.matchlabelView.startTest(8000);
    // $.gamelabelView.startTest(8000);
    // $.powerBarView.startTest(500);
    // $.winloseordrawView.startTest(8000, $.winloseordrawTestSubView);
    // $.matchsummytableView.startTest(8000);

    $.main.backgroundColor = Vendor.Tinycolor.random().toHexString();
};

function unLoad() {
    Alloy.Logger.debug('[' + $.main.name + '] unLoad');

    loaded = false;
    openedWindow = false;

    // $.matchlabelView.stopTest();
    // $.gamelabelView.stopTest();
    // $.powerBarView.stopTest();
    // $.winloseordrawView.stopTest($.winloseordrawTestSubView);
    // $.matchsummytableView.stopTest();
};

exports.getLoad = function() {
    return loaded;
};

exports.load = function() {
    load();
};

exports.unLoad = function() {
    unLoad();
};

initialize();
