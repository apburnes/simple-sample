Meteor.methods({

  signupUser: function(accountData) {
    Accounts.createUser(accountData, function (err) {
			if (err) {
				console.log(err);
			}
		});
  }
  
});