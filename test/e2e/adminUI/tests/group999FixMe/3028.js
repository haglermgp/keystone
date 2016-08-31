module.exports = {
	before: function (browser) {
		browser.adminUIApp = browser.page.adminUIApp();
		browser.adminUISignin = browser.page.adminUISignin();
		browser.adminUIListScreen = browser.page.adminUIListScreen();
		browser.adminUIItemScreen = browser.page.adminUIItemScreen();
		browser.adminUIInitialFormScreen = browser.page.adminUIInitialForm();

		browser.app.gotoHomeScreen();
		browser.adminUIApp.waitForSigninScreen();

		browser.adminUISignin.signin();
		browser.adminUIApp.waitForHomeScreen();
	},
	after: function (browser) {
		browser.adminUIApp.signout();
		browser.end();
	},
	'Should be able to create an inline relationship': function(browser) {
		// Create items
		browser.adminUIApp.openList({section: 'Miscs', list: 'InlineRelationship'});
		browser.adminUIListScreen.createFirstItem();
		browser.adminUIApp.waitForInitialFormScreen();
		browser.adminUIInitialFormScreen.save();

		browser.adminUIApp.waitForItemScreen();
		browser.adminUIItemScreen.assertUI({
			listName: 'Relationship',
			fields: ['fieldA']
		});

		// TODO: test button and create form

	}
};
