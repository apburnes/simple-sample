Template.projectList.helpers({
	projects: function() {
		var user = Meteor.user();
		return Projects.find({userId: user._id}, { sort: {created_at: -1} });
	},
	geomCount: function () {
		return Geoms.find({projectId: this._id}).count();
	}
})

Template.projectList.events({
	'click .delete-project': function (e) {
		e.preventDefault();

		var confirmDelete = confirm("Are you sure you want to delete project? " + this.name);

		if (confirmDelete) {
			Projects.remove(this._id);
		}
	},
})