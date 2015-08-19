var args = arguments[0] || {};

$.main.backgroundColor = args.backgroundColor;

$.previousView.backgroundColor = args.previous.backgroundColor;
$.previousLabel.color = args.previous.color;

$.nextView.backgroundColor = args.next.backgroundColor;
$.nextLabel.color = args.next.color;

$.previousView.addEventListener('click', function(e) {
    $.main.fireEvent('click:previous', e);
});

$.previousView.addEventListener('touchstart', function() {
    $.previousSubView.opacity = $.previousSubView.opacityAct;
});

$.previousView.addEventListener('touchmove', function() {
    this.fireEvent('touchstart');
});

$.previousView.addEventListener('touchend', function() {
    $.previousSubView.opacity = $.previousSubView.opacityInAct;
});

$.previousView.addEventListener('touchcancel', function() {
    this.fireEvent('touchend');
});

$.nextView.addEventListener('click', function(e) {
    $.main.fireEvent('click:next', e);
});

$.nextView.addEventListener('touchstart', function() {
    $.nextSubView.opacity = $.nextSubView.opacityAct;
});

$.nextView.addEventListener('touchmove', function() {
    this.fireEvent('touchstart');
});

$.nextView.addEventListener('touchend', function() {
    $.nextSubView.opacity = $.nextSubView.opacityInAct;
});

$.nextView.addEventListener('touchcancel', function() {
    this.fireEvent('touchend');
});
