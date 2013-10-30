Template.projectMap.rendered = function () {
	var markers;

	var projectId = Session.get('currentProjectId');
	var shapeList = Geoms.find({projectId: projectId}).fetch();
	var shapeCount = Geoms.find({projectId: projectId}).count();

	Map = L.map('project-map');

	var latList = [];
	var lngList = [];

	if (shapeCount > 0) {

		_.each(shapeList, function (item) {
			if (item.geometry.type === 'Point') {

				latList.push(item.geometry.coordinates[1]);
				lngList.push(item.geometry.coordinates[0]);

			}

			else if (item.geometry.type === 'LineString') {

				_.each(item.geometry.coordinates, function (coords) {
					latList.push(coords[1]);
					lngList.push(coords[0]);
				})

			}

			else if (item.geometry.type === 'Polygon') {
				console.log(item.geometry.coordinates[0]);
				_.each(item.geometry.coordinates[0], function (coords) {
					latList.push(coords[1]);
					lngList.push(coords[0]);
				})

			}

		});

		if ((latList.length === 1) && (lngList.length === 1)) {

			Map.setView([latList[0], lngList[0]], 12)

		} else {

			var southWest = new L.LatLng(_.min(latList), _.min(lngList));
			var northEast = new L.LatLng(_.max(latList), _.max(lngList));
			var bndry = new L.LatLngBounds(southWest, northEast);

			Map.fitBounds(bndry);
		}

	} else {

		Map.setView([33.4500, -112.0667], 12);

	}

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
		maxZoom: 18
	}).addTo(Map);

	var pointGroup = new L.LayerGroup().addTo(Map);
	var lineGroup = new L.LayerGroup().addTo(Map);
	var polygonGroup = new L.LayerGroup().addTo(Map);

	Deps.autorun(function () {

		var projectId = Session.get('currentProjectId')
		var shapeList = Geoms.find({projectId: projectId}).fetch();

		var publicIcon = L.icon({
			iconUrl: "/public-marker.png" 
		});

		filterGeoms(shapeList, pointGroup, lineGroup, polygonGroup);

	});
}

function filterGeoms(shapeList, pointGroup, lineGroup, polygonGroup) {

	lineGroup.clearLayers();
	pointGroup.clearLayers();
	polygonGroup.clearLayers();

	var publicIcon = L.icon({
          iconUrl: "/public-marker.png"
  });

	_.each(shapeList, function (item) {

		if (item.geometry.type === 'Point') {
			var pointLayer = L.geoJson(item, {
				pointToLayer: function(feature, latlng) {
					return L.marker(latlng, {icon: publicIcon})
				},
				onEachFeature: function(feature,layer) {
					layer.bindPopup(feature.desc);
				}
			});
			pointLayer.addTo(pointGroup);

		} else if (item.geometry.type === "LineString") {
			var lineLayer = L.geoJson(item, {
				onEachFeature: function(feature,layer) {
					layer.bindPopup(feature.desc);
				}
			});
			lineLayer.addTo(lineGroup);

		} else if (item.geometry.type === "Polygon") {
			var polygonLayer = L.geoJson(item, {
				style: {color: "#FF2A2A"},
				onEachFeature: function(feature, layer) {
					layer.bindPopup(feature.desc);
				}
			});
			polygonLayer.addTo(polygonGroup);
		}
	})
}