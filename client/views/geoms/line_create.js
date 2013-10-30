Template.lineCreate.helpers({
	nextPoint: function () {
		return Session.get('nextPoint-' + Session.get('currentProjectId'));
	}
})

Template.lineCreate.rendered = function () {

	var inputLat = '#inputLat';
	var inputLng = '#inputLng';

	getCoords(inputLat, inputLng);

	$('.next-point').click(function () {

		var inputLat = '.input-lat';
		var inputLng = '.input-lng';

		getCoords(inputLat, inputLng);

		var inputCoords = "<div class='form-group'><label for='inputLat' class='col-md-2 control-label'>Lat</label><div class='col-md-8'><input name='inputLat' type='number' step='any' min='-180' max='180' class='form-control coords input-lat' placeholder='Latitude'></div></div><div class='form-group'><label for='inputLong' class='col-md-2 control-label'>Long</label><div class='col-md-8'><input name='inputLong' type='number' step='any' min='-180' max='180' class='form-control coords input-lng' placeholder='Long'></div></div>";

		$('#add-next-point').before($(inputCoords));

	});

	var lineForm = this.find('form');

	$(lineForm).validate({
		rules: {
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

			var coordsList = [];
			var inputLat = '.input-lat';
			var inputLng = '.input-lng'

			listCoords(coordsList, inputLat, inputLng);

			var geom = {
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: coordsList
				},
				name: $('#line-create').find('#line-name').val(),
				desc: $('#line-create').find('#line-desc').val(),
				userId: user._id,
				projectId: projectId,
				created_at: new Date().getTime()
			}

			geom._id = Geoms.insert(geom);
			Session.set("addLine-" + projectId, false);
		}
	})
}

Template.lineCreate.events({
	'submit form': function (e, tmpl) {
		e.preventDefault();

		var projectId = Session.get('currentProjectId');
		Meteor.Router.to('projectPage', projectId);
	},

	'click #cancel-line': function (e) {
		e.preventDefault();

		Session.set('addLine-' + Session.get('currentProjectId'), false);
	}
})

var getCoords = function (latField, lngField) {

	var geo = {};

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showMap, error);
	}

	function showMap(position) {
		geo.lat = position.coords.latitude;
		geo.lng = position.coords.longitude;
		$(latField).each(function () {
			if ($(this).val().length === 0) {
				$(this).val(geo.lat);
			}
		});
		$(lngField).each(function () {
			console.log()
			if ($(this).val().length === 0) {
				$(this).val(geo.lng);
			}
		});
	}

	function error() {
		console.log("Geocoder failed");
	}
}

var listCoords = function (array, inputLat, inputLng) {
	var listLat = [];
	var listLng = [];

	if ($(inputLat).length === $(inputLng).length) {
		$(inputLat).each(function () {
			listLat.push($(this).val());
		});

		$(inputLng).each(function () {
			listLng.push($(this).val());
		});

		for(var i = 0; i < $(inputLat).length; i++) {
			array.push([listLng[i], listLat[i]]);
		}
	}

	console.log(listLat, listLng)
}