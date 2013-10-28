Meteor.methods({
  signupUser: function(accountData) {
    Accounts.createUser(accountData, function (err) {
			if (err) {
				console.log(err);
			}
		});
  },
	getCoords: function() {

		var Geo = {};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		}

		function error() {
         console.log("Geocoder failed");
     }

		function success(position) {
			Geo.lat = position.coords.latitude;
			Geo.lng = position.coords.langitude
		}

		return Geo;

	}
});