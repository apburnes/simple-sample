Accounts.emailTemplates.siteName = "SimpleSample";
Accounts.emailTemplates.from = "";

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "SimpleSample Password Reset";
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
   
   var token = url.substring(url.lastIndexOf('/') + 1);
   
   return "Hi " + user.profile.name + ",\n\n" 
        + "A password reset has been requested for this account. To reset the password, visit the following link:\n\n" 
        + "http://localhost:3000/new-password/" + token + "\n\n" 
        + "If you did not request this reset, please ignore this email.";
};