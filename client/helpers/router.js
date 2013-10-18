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
	'/reset-password': {
    to: 'resetPassword',
    and: function() {
      $('html,body').scrollTop(0);
    }
  },
	'/new-password/:token': {
		to: 'newPasswordForm',
		and: function(token) {
			Session.set("passwordResetToken", token);
			$('html,body').scrollTop(0);
		}
	},
	'/profile': {
		to: 'profile',
		and: function() {
			$('html, body').scrollTop(0);
		}
	},
	'/create-project': {
		to: 'createProject',
		and: function() {
			$('html, body').scrollTop(0);
		}
	},
	'/project/:_id': {
		to: 'projectPage',
		and: function(id) {
			Session.set('currentProjectId', id);
			$('html, body').scrollTop(0);
		}
	},
	'/project/:_id/map': {
		to: 'projectMapView',
		and: function(id) {
			Session.set('currentProjectId', id);
			$('html, body').scrollTop(0);
		}
	}
});

Meteor.Router.filters({
	'requireLogin': function (page) {
		if (Meteor.user())
			return page;
		else if (Meteor.loggingIn())
			return 'loading';
		else
			return 'home';
	},
	
	'currentUser': function (page) {
		if (Meteor.user())
			// Meteor.Router.to('profile');
			return 'profile';
		else
			return page;
	}
});

Meteor.Router.filter('requireLogin', {only: 'profile'});
Meteor.Router.filter('currentUser', { only: ['home', 'signup', 'login', 'resetPassword', 'newPasswordForm']} )