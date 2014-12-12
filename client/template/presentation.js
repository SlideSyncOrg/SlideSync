Template.presentations.helpers({
    //Return all presentations user created, in reverse chronological order
    allPresentations: function() {
        return Presentations.find({
            ownerId: Meteor.userId(),
        }, {
            sort: {
                createdAt: -1
            }
        });
    }
});


Template.presentations.events({
    //Create a new presentation
    'submit #addPrez': function(event) {
        var title = event.target.title.value;

        //Make call to server
        Meteor.call('insertPresentation', title, function() {
        });
            Notifications.info('Presentation created !');

        //Clear form
        event.target.title.value = "";

        //Prevent the page to reload
        return false;


    },

    //Delete presentation
    'click #deleteBtn': function() {
        Meteor.call('deletePresentation', this._id);
    },

});
