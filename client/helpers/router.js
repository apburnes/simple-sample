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
	'/profile': {
		to: 'profile',
		and: function() {
			$('html, body').scrollTop(0);
		}
	}
});