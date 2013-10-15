Template.signup.rendered = function() {
	var signupForm = this.find('form');
	
	$(signupForm).validate({
		rules: {
			signupName: {
				required: true,
				minlength: 3
			},
			signupEmail: {
				required: true,
				email: true,
			},
			signupPassword: {
				required: true,
				minlength: 7
			}
		},
		messages: {
			signupName: {
				required: 'Please enter a name.',
				minlength: 'Must be 3 characters or more'
			},
			signupEmail: {
				required: 'Please enter an email.',
				email: 'Please enter a valid email address.',
			},
			signupPassword: {
				required: 'Please enter a password.',
				minlength: 'Password must be 7 characters or more'
			}
		},
		submitHandler: function() {
			var accountData = {
				profile: {
					name: $('#signup').find("[name='signupName']").val()
				},
				email: $('#signup').find("[name='signupEmail']").val(),
				password: $('#signup').find("[name='signupPassword']").val()
			}
			
			Accounts.createUser(accountData, function (error) {
				if (error) {
					FlashMessages.sendError(error.reason, { autoHide: true, hideDelay: 5000 })
					Meteor.Router.to('signup');
				} else {
					Meteor.setTimeout(function() {
						Meteor.loginWithPassword(accountData.email, accountData.password, function() {
							FlashMessages.sendSuccess("Welcome" + accountData.profile.name, { autoHide: true, hideDelay: 5000});
							Meteor.Router.to('profile');
						});
					}, 100);
				}
			});
		}
	});
}

Template.signup.events({
	'submit form': function(e) {
		e.preventDefault();
	}
});