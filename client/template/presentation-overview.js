Template.presentationOverview.helpers({
    'gimmeStatesArray': function() {
        ()
    }
});


Template.presentationOverview.events({
    'click .addState': function(event) {

        Meteor.call('addState', Template.parentData(1)._id);
    },
    
    'submit #addTimeline': function(event) {
        var title = event.target.title.value;


        Meteor.call('addTimeline', this._id, title);

        // Clear form
        event.target.title.value = "";

        //prevent the page to reload
        return false;
    },
});
