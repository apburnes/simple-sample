Template.profile.helpers({
	profileName: function() {
		return Meteor.user().profile.name;
	},
	userEmail: function() {
		return Meteor.user().emails[0].address;
	},
	currentProject: function() {
		return Session.get('currentProjectId')
	}
});