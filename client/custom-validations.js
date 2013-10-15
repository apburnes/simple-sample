/* Account Existence */

// $.validator.addMethod("accountExists", function(value, element) { 
// 
//   var findEmail = Meteor.users.findOne({'emails.address': {$regex: value} }),
//          exists = findEmail ? true : false; 
//   
//   return exists; 
//   
// }, "");