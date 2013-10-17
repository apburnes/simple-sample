Template.geomCreate.rendered = function () {
	$(function (getLocation) {

      var Geo = {};

      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
      }

      //Get the latitude and the longitude;
      function success(position) {
          Geo.lat = position.coords.latitude;
          Geo.lng = position.coords.longitude;
          populateHeader(Geo.lat, Geo.lng);
      }

      function error() {
          console.log("Geocoder failed");
      }

      function populateHeader(lat, lng) {
          $('#inputLat').val(lat);
          $('#inputLong').val(lng);
      }

  });

	var pointForm = this.find('form');
	
	$(pointForm).validate({
		rules: {
			inputLat: {
				required: true
			},
			inputLong: {
				required: true
			},
			pointName: {
				required: true
			}
		},
		messages: {
			inputLat: {
				required: "You must enter a valid latitude."
			},
			inputLong: {
				required: "You must enter a valid longitude."
			},
			pointName: {
				required: "Please enter a name."
			}
		},
		submitHandler: function () {
			var user = Meteor.user();
			var projectId = Session.get('currentProjectId');
			
			var geom = {
				lat: $('#geom-create').find('[name="inputLat"]').val(),
				lng: $('#geom-create').find('[name="inputLong"]').val(),
				name: $('#geom-create').find('[name="pointName"]').val(),
				desc: $('#geom-create').find('[name="pointDesc"]').val(),
				userId: user._id,
				projectId: projectId,
				created_at: new Date().getTime()
			}
			
			geom._id = Geoms.insert(geom);
			Session.set("adding-" + projectId, false)
		}
	})
}

Template.geomCreate.events({
	'submit form': function (e, tmpl) {
		e.preventDefault();
	},
	'click #cancel-point': function (e) {
		e.preventDefault();
		
		Session.set('adding-' + Session.get('currentProjectId'), false);
	}
})