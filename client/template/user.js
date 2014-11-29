Template.authenticatedUser.helpers({
    loggedIn: function() {
        if(Meteor.user()) {
            return true;
        }
        return false;
    },
    
    username: function() {
        if (Meteor.user().profile.name) {
            return Meteor.user().profile.name;
        }
        return Meteor.user().emails[0].address;
    }
});
