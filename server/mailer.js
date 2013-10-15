Meteor.methods({
  
  signupEmail: function(recipient) {
    
    var recipientEmail = recipient.email;
    var recipientName  = recipient.profile.name;

    Email.send({
      to: recipientEmail,
      from: "",
      subject: "A Simple Sample welcome to " + recipientName,
      html: Handlebars.templates.signup({
        recipientName: recipientName
      })
    }); 
            
  },
  
  sendTimelineEmail: function(recipients, senderName, projectName, timelineUrl) {
    
    var recipientsList = recipients;
     
    for (var i = 0; i < recipientsList.length; i++) {
      
      var recipient = recipientsList[i];

      Email.send({
        to: recipient.email,
        from:  senderName + "",
        subject: "Simple Sample user " + senderName + " has sent you a site map!",
        html: Handlebars.templates.sendsitemap({
          recipientName: recipient.name,
          senderName: senderName,
          projectName: projectName,
          timelineLink: timelineUrl
        })
      });
        
    }
    
  }
  
});