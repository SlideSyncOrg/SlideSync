Template.presentationOverview.helpers({

});


Template.presentationOverview.events({
    'click .addState': function(event) {

        Meteor.call('addState', Template.parentData(1)._id);
    },

    'click .addTimeline': function(event) {

        Meteor.call('addTimeline', Template.parentData(1)._id, "tempo");
    },
});
