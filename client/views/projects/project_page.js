Template.projectPage.helpers({
	currentProject: function() {
		return Projects.findOne(Session.get('currentProjectId'));
	},
	projects: function() {
		var user = Meteor.user();
		return Projects.find({userId: user._id}, { sort: {created_at: -1} });
	},
	adding: function () {
		return Session.get('adding-' + this._id)
	},
	noGeomList: function () {
		return Geoms.find({projectId: Session.get('currentProjectId')}).count() === 0;
	}
})

Template.projectPage.events({
	'click .add-point': function (e, tmpl) {

		e.preventDefault();
		$('.add-point').prop('disabled', true);
		
		Session.set('adding-' + Session.get('currentProjectId'), true);
		// 
		// 	var user = Meteor.user();
		// 	var project = Projects.findOne(this);
		// 	var geom = {
		// 		name: "Name Point",
		// 		desc: "Attribute Point",
		// 		userId: user._id,
		// 		projectId: project._id,
		// 		created_at: new Date().getTime()
		// 	}
		// 
		// 	if (user._id != project.userId) {
		// 		FlashMessages.sendError("You are not allowed to add to this project.", { autoHide: true, hideDelay: 5000 })
		// 		throw new Meteor.Error(401, "You are not allowed to post points.")
		// 	};
		// 
		// 	console.log(navigator.geolocation)
		// 
		// 	if (navigator.geolocation) {
		// 		navigator.geolocation.getCurrentPosition(success, error);
		// 	}
		// 
		// 	function success(position) {
		// 		geom.lat = position.coords.latitude;
		// 		geom.lng = position.coords.longitude;
		// 		geom.elev = position.coords.altitude;
		// 		geom.accuracy = position.coords.accuracy;
		// 		geom.elevAccuracy = position.coords.altitudeAccuracy;
		// 		geom._id = Geoms.insert(geom);
		// 	}
		// 
		// 	function error() {
		// 		Flash.Messages.sendError("Geoloction is not working. Please allow.", { autoHide: true, hideDelay: 5000 })
		//     }
		}
})