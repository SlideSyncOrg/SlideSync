Meteor.subscribe("presentations");

Template.presentations.helpers({
	prezs: function () {
		console.log("Try to find prezs ")
		return Presentations.find({});
	}
});


Template.presentations.events({
    'submit #addPrez': function(event) {
        //add a new presentation
        console.log("Create a presentation ")


        var title = event.target.title.value;

        Presentations.insert({
        	owner : Meteor.user().profile.name,
        	ownerId : Meteor.userId(),
            title: title,
            createdAt: new Date() // current time
        });

        // Clear form
        event.target.title.value = "";

        //prevent the page to reload
        return false;
    }
});
