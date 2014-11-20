Meteor.subscribe("presentations");

Template.presentations.helpers({
	prezs: function () {
		console.log("Try to find prezs ")
		return Presentations.find({});
	}
});


Template.presentations.events({
	'submit .new-presentation': function (event) {
		//add a new presentation
	}
});

