$.navbarView.setTitleView(L('nologin.register.title'));

$.navbarView.setLeftView({
	icon : 'arrow_left',
	title : L('back')
});

$.navbarView.getView().addEventListener('left:click', function(e) {
	$.main.close();
});

function initialize() {

};

initialize();
