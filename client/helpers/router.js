Meteor.Router.add({
	'/': {
		to: 'home',
		and: function() {
			$('html, body').scrollTop(0);
		}
	},
	'/login': {
		to: 'login',
		and: function() {
			$('html, body').scrollTop(0);
		}
	},
	'/signup': {
		to: 'signup',
		and: function() {
			$('html, body').scrollTop(0);
		}
	},
	'/profile': {
		to: 'profile',
		and: function() {
			$('html, body').scrollTop(0);
		}
	}
});

Meteor.Router.filters({
	'requireLogin': function(page) {
		if (Meteor.user())
			return page;
		else if (Meteor.loggingIn())
			return 'loading';
		else
			return 'home';
	}
});

Meteor.Router.filter('requireLogin', {only: 'profile'});	