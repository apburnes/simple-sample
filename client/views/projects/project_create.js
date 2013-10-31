Template.createProject.rendered = function () {
	var projectForm = this.find('form');
	
	$(projectForm).validate({
		rules: {
			projectTitle: {
				required: true,
				minlength: 2
			}
		},
		messages: {
			projectTitle: {
				required: "Please enter a title.",
				minlength: "Title must be at least (2) characters."
			}
		},
		submitHandler: function () {
			var user = Meteor.user();
			var title = $('#project-creation').find("[name='projectTitle']").val();
			var description = $('#project-creation').find("[name='projectDescription']").val();

			if (!user) {
				FlashMessages.sendError("You must be logged in to creat projects", { autoHide: true, hideDelay: 5000 })
				throw new Meteor.Error(401, "You are not allowed to post links.")
			};

			var project = {
				title: title,
				description: description,
				created_at: new Date().getTime(),
				userId: user._id
			}

			project._id = Projects.insert(project)
			Meteor.Router.to('projectPage', project);
		}
	})
}

Template.createProject.events({
	'submit form': function (e, tmpl) {
		e.preventDefault();
	}
});