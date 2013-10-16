Template.projectList.helpers({
	projects: function() {
		var user = Meteor.user();
		return Projects.find({userId: user._id}, { sort: {created_at: -1} });
	}
})