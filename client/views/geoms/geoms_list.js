Template.geomList.helpers({
	geoms: function() {
		return Geoms.find({projectId: Session.get('currentProjectId')}, { sort: {created_at: -1} });
	}
});