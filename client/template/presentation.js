Template.body.helpers({
	prez: function () {
		return Presentations.find({});
	},
	daUser: function(){
		console.log(Meteor.user())
		return Meteor.user();
	}
});


Template.body.events({
	'submit .new-presentation': function (event) {
		//add a new presentation
	}
});

Meteor.subscribe("presentations");