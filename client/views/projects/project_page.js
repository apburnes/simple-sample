Template.projectPage.helpers({
	currentProject: function() {
		return Projects.findOne(Session.get('currentProjectId'));
	}
})