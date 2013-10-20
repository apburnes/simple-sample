Template.profile.helpers({
	profileName: function() {
		return Meteor.user().profile.name;
	},
	userEmail: function() {
		return Meteor.user().emails[0].address;
	},
	noProjects: function() {
		return Projects.find({userId: Meteor.user()._id }).count() === 0;
	}
});