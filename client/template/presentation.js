Template.presentations.helpers({
    allPresentations: function() {
        return Presentations.find({
            ownerId: Meteor.userId()
        });
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

    'click #editBtn': function() {
        console.log("edit this prez")
        console.log(this.title)
    },

    'click #deleteBtn': function() {
        Meteor.call('deletePresentation', this);
    },

    'click #presentBtn': function(event) {
        console.log("present this prez")
    },

});
