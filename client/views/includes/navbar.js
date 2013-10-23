Template.navbar.events({
	'click #logout-link': function(e) {
		e.preventDefault();
		Meteor.logout(function() {
			Meteor.Router.homePath();
			FlashMessages.sendSuccess("Successfully Logged Out!", { autoHide: true, hideDelay: 5000})
			$('html,body').scrollTop(0);
		});
	}
});