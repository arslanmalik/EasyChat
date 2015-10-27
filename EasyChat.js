Message = new Mongo.Collection("msgs");
 
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    msgs: function () {
      return Message.find({}, {sort: {createdAt: -1}});
    }
  });
  Template.body.events({
    "submit .new-message": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.text.value;
 
      // Insert a task into the collection
      Message.insert({
        text: text,
        createdAt: new Date(),
		username: Meteor.user().username
      });
 
      // Clear form
      event.target.text.value = "";
    }
  });
  
  Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
	});
}