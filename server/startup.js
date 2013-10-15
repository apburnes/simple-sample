;(function () {

  "use strict";


////////////////////////////////////////////////////////////////////
// Patches
//

if (!console || !console.log) {
  // stub for IE
  console = { 
    log: function (msg) {
      $('#log').append(msg)
    } 
  };
}

////////////////////////////////////////////////////////////////////
// Startup
//

Meteor.startup(function () {


  ////////////////////////////////////////////////////////////////////
  // Create Test Users
  //

  if (Meteor.users.find().fetch().length === 0) {

    console.log('Creating users: ');

    var users = [
        {name:"andrew",email:"apburnes@gmail.com",roles:['admin']}
      ];

    _.each(users, function (userData) {
      var id,
          user;
      
      console.log(userData);

      id = Accounts.createUser({
        email: userData.email,
        password: "Law$r2beGood",
        profile: { name: userData.name }
      });

      // email verification
      Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      Roles.addUsersToRoles(id, userData.roles);
    
    });
  }

  ////////////////////////////////////////////////////////////////////
  // Prevent non-authorized users from creating new users
  //

  // Accounts.validateNewUser(function (user) {
  //   var loggedInUser = Meteor.user();
  // 
  //   if (Roles.userIsInRole(loggedInUser, ['admin'])) {
  //     return true;
  //   }
  // 
  //   throw new Meteor.Error(403, "Not authorized to create new users");
  // });


});

}());