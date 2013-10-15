Template.navbar.events({
	'click .logout-link': function(e) {
		e.preventDefault();
		Meteor.logout(function() {
			Meteor.Router.homePath();
			$('html,body').scrollTop(0);
		});
	}
});