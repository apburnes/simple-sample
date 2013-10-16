Template.resetPassword.rendered = function () {
	var resetForm = this.find('form');

	$(resetForm).validate({
		rules: {
			accountEmail: {
				required: true,
				email: true
			}
		},
		messages: {
			accountEmail: {
				required: "Please enter an email.",
				email: "Please enter a valid email address."
			}
		},
		submitHandler: function() {
			var email = $('#reset-password').find("[name='accountEmail']").val();

			Accounts.forgotPassword({email: email}, function(error) {
				if (error) {
					FlashMessages.sendError(error.reason, { autoHide: true, hideDelay: 5000 });
				} else {
					$("#reset-password").hide();
          $(".reset-sent").fadeIn();
				}
			});
		}
	});
}

Template.resetPassword.events({
	'submit form': function (e) {
		e.preventDefault();
	}
})

Template.newPasswordForm.rendered = function() {
	var passwordForm = this.find('form');
	$(passwordForm).validate({
		rules: {
			newPassword: {
				required: true,
				minlength: 7
			}
		},
		messages: {
			newPassword: {
				required: "Please enter a password.",
				minlength: "New password must be at least (7) characters"
			}
		},
		submitHandler: function() {
			var resetToken = Session.get('passwordResetToken');
			var newPassword = $('#new-password-form').find("[name='newPasswordForm']").val();
			
			Accounts.resetPassword(resetToken, newPassword, function (error) {
				if (error) {
					FlashMessages.sendError(error.reason, { autoHide: true, hideDelay: 5000 });
				} else {
					FlashMessages.sendSuccess('New pasword has been created.', { autoHide: true, hideDelay: 5000 });
					Meteor.logout(function() {
						Meteor.Router.to('/login');
						$('html,body').scrollTop(0);
					});
				}
			});
		}
	});
}

Template.newPasswordForm.events({
	'submit form': function (e) {
		e.preventDefault();
	}
});