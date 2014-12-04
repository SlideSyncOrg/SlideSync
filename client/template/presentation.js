Template.presentations.helpers({
    allPresentations: function() {
        return Presentations.find({
            ownerId: Meteor.userId(),
        }, {sort: {createdAt: -1}});
    }
});


Template.presentations.events({
    'submit #addPrez': function(event) {


        var title = event.target.title.value;


        Meteor.call('insertPresentation', title);

        // Clear form
        event.target.title.value = "";

        //prevent the page to reload
        return false;
    },

    'click #deleteBtn': function() {
        Meteor.call('deletePresentation', this._id);
    },

});
