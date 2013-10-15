Template.login.rendered = function() {
	var loginForm = this.find('form');

	$(loginForm).validate({
		rules: {
			emailAddress: {
				email: true,
				required: true
			},
			accountPassword: {
				required: true,
				minlength: 7
			}
		},
		messages: {
			emailAddress: {
				required: "Required.",
				email: "Not an email adresss."
			},
			accountPassword: {
				required: "Required.",
				minlength: "Must be at least 7 characters."
			}
		},
		submitHandler: function() {
			var email = $('#login').find("[name='emailAddress']").val();
			var password = $('#login').find("[name='accountPassword']").val();
			
			Meteor.loginWithPassword(email, password, function(err, res) {
				if (err) {
					alert(err.reason)
				} else {
					FlashMessages.sendSuccess("Hello " + Meteor.user().profile.name, { autoHide: true, hideDelay: 5000});
					Meteor.Router.to('profile');
				}
			});
		}
	});
}

Template.login.events({
	'submit form': function(e) {
		e.preventDefault();
	}
});