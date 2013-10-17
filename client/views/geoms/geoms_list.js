Template.geomList.helpers({
	geoms: function() {
		return Geoms.find({projectId: Session.get('currentProjectId')}, { sort: {created_at: -1} });
	}
});

Template.geomList.events({
	'click .delete-point': function (e) {
		e.preventDefault();

		var confirmDelete = confirm("Are you sure you want to delete point? " + this.name);

		if (confirmDelete) {
			Geoms.remove(this._id);
			Deps.flush();
		}
	}
});