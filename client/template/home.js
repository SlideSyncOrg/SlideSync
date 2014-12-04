Template.home.events({
    'click #securityTest': function() {
        Meteor.call('insertPresentation', 'Security Test Failed');
        Meteor.call('deletePresentation', "etzL95e5iYzBwFr89");
        Meteor.call('addTimeline', "GP2YpJK6suZgoyMBa", 'Security Test Failed', true);
        Meteor.call('addState', "GP2YpJK6suZgoyMBa");
        Meteor.call('nextState', "GP2YpJK6suZgoyMBa");
        Meteor.call('nextState', "GP2YpJK6suZgoyMBa");
        Meteor.call('previousState', "GP2YpJK6suZgoyMBa");
        Meteor.call('nextState', "GP2YpJK6suZgoyMBa");
    }
});
