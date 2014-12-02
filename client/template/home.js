Template.home.events({
    'click #securityTest': function() {
        Meteor.call('insertPresentation', 'Security Test Failed');
        Meteor.call('deletePresentation', "etzL95e5iYzBwFr89");
        Meteor.call('addTimeline', "etzL95e5iYzBwFr89", 'Security Test Failed', true);
        Meteor.call('addState', "etzL95e5iYzBwFr89");
        Meteor.call('nextState', "etzL95e5iYzBwFr89");
        Meteor.call('previousState', "etzL95e5iYzBwFr89");
    }
});
