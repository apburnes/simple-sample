Projects = new Meteor.Collection('projects');

Projects.allow({
  insert: function (userId, doc) {
    return userId == doc.owner;
  },
  update: function (userId, doc) {
    return userId == doc.owner;
  },
  remove: function (userId, doc) {
    return userId == doc.owner;
  }
});

Projects.deny({
  insert: function (userId, doc) {
    return (!userId || userId != doc.owner);
  },
  update: function (userId, doc) {
    return (!userId || userId != doc.owner);
  },
  remove: function (userId, doc) {
    return (!userId || userId != doc.owner);
  }
})