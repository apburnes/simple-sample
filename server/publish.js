Meteor.publish('projects', function() {
	return Projects.find();
});

Meteor.publish('geoms', function() {
	return Geoms.find();
});