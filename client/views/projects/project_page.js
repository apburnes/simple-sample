Template.projectPage.helpers({
	currentProject: function() {
		return Projects.findOne(Session.get('currentProjectId'));
	},
	projects: function() {
		var user = Meteor.user();
		return Projects.find({userId: user._id}, { sort: {created_at: -1} });
	},
	addPoint: function () {
		$('.add-point').prop('disabled', true);
		return Session.get('addPoint-' + this._id);
	},
	addLine: function () {
		return Session.get('addLine-' + this._id);
	},
	noGeomList: function () {
		return Geoms.find({projectId: Session.get('currentProjectId')}).count() === 0;
	}
})

Template.projectPage.events({
	'click .add-point': function (e, tmpl) {

		e.preventDefault();

		Session.set('addPoint-' + Session.get('currentProjectId'), true);

		$('.add-point').prop('disabled', true);

		},
		'click .add-line': function (e, tmpl) {

			e.preventDefault();

			Session.set('addLine-' + Session.get('currentProjectId'), true);

			$('.add-line').prop('disabled', true);
		}
})