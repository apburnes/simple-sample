Template.projectList.helpers({
	projects: function() {
		var user = Meteor.user();
		return Projects.find({userId: user._id}, { sort: {created_at: -1} });
	}
})

Handlebars.registerHelper("prettifyDate", function(timestamp) {
  var date = new Date(timestamp); 
	var dateArray = date.toString().split(" ");
	return dateArray[1] + " " + dateArray[2] + " " + dateArray[3];
});