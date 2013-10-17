Handlebars.registerHelper("prettifyDate", function(timestamp) {
  var date = new Date(timestamp); 
	var dateArray = date.toString().split(" ");
	return dateArray[1] + " " + dateArray[2] + " " + dateArray[3];
});

Handlebars.registerHelper("coordClip", function(num) {
	return parseFloat(num).toFixed(4);
});