Template.projectMap.rendered = function () {
	var markers;

	var projectId = Session.get('currentProjectId')
	var pointList = Geoms.find({projectId: projectId}).fetch();
	var pointCount = Geoms.find({projectId: projectId}).count();

	Map = L.map('project-map').setView([33.4500, -112.0667], 8);

	var latList = [];
	var lngList = [];

	if (pointCount > 0) {
		_.each(pointList, function (geo) {
			latList.push([geo.lat]);
			lngList.push([geo.lng]);
		});

		var minLat = _.min(latList)[0];
		var maxLat = _.max(latList)[0];
		var minLng = _.min(lngList)[0];
		var maxLng = _.max(lngList[0]);

		var bndry = [[minLat, minLng],[maxLat,maxLng]];
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
