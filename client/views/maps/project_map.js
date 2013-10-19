Template.projectMap.rendered = function () {
	var markers;

	var projectId = Session.get('currentProjectId')
	var pointList = Geoms.find({projectId: projectId}).fetch();
	var pointCount = Geoms.find({projectId: projectId}).count();

	Map = L.map('project-map');

	var latList = [];
	var lngList = [];

	if (pointCount === 1) {

		Map.setView([_.pluck(pointList, 'lat')[0], _.pluck(pointList, 'lng')[0]], 12);

	} else if (pointCount > 1) {

		_.each(pointList, function (geo) {
			latList.push([geo.lat]);
			lngList.push([geo.lng]);
		});

		var southWest = new L.LatLng(_.min(latList)[0], _.min(lngList)[0]);
		var northEast = new L.LatLng(_.max(latList)[0], _.max(lngList)[0]);

		var bndry = new L.LatLngBounds(southWest, northEast);

		Map.fitBounds(bndry);
	} else {
		Map.setView([33.4500, -112.0667], 8);
	}

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
		maxZoom: 18
	}).addTo(Map);

	markers = new L.LayerGroup().addTo(Map)

	Deps.autorun(function () {
		var projectId = Session.get('currentProjectId')
		var pointList = Geoms.find({projectId: projectId}).fetch();

		var publicIcon = L.icon({
			iconUrl: "/public-marker.png" 
		});

		markers.clearLayers();

		_.each(pointList, function (geo) {

			var marker = L.marker([geo.lat, geo.lng], {icon: publicIcon});
			marker.bindPopup('<strong>' + geo.name + '</strong><br />' + geo.desc);
			marker.addTo(markers);
		});
	});
}
