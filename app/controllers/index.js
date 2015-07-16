// var rand = Vendor.Chance.pick([true, false]);
//
// Ti.API.info('set user:', (rand) ? 'yes' : 'no');
//
// var data = {
// id : 1,
// userId : null,
// token : null,
// updatedAt : 0
// };
//
// // if (rand) {
// // data = {
// // id : 1,
// // userId : Chance.guid(),
// // token : Chance.hash(),
// // updatedAt : Chance.timestamp()
// // };
// // }
//
// Alloy.Models.user.set(data);
// Alloy.Models.user.save();
//
// Ti.API.error('userId:', typeof Alloy.Models.user.get('userId'), Alloy.Models.user.get('userId'));
// Ti.API.error('token:', typeof Alloy.Models.user.get('token'), Alloy.Models.user.get('token'));
// Ti.API.error('updatedAt:', typeof Alloy.Models.user.get('updatedAt'), Alloy.Models.user.get('updatedAt'));
//
// if (_.isNull(Alloy.Models.user.get('userId')) && _.isNull(Alloy.Models.user.get('token'))) {
// $.nologin.getView().open();
// } else {
// $.login.getView().open();
// }
//
// Ti.API.info("Ti.Locale.currentLanguage = " + Ti.Locale.currentLanguage);
// Ti.API.info("Ti.Locale.currentLocale = " + Ti.Locale.currentLocale);

$.nologin.getView().open(); 