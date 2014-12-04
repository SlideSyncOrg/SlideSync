Template.authenticatedUser.helpers({
    //Security check
    loggedIn: function() {
        if(Meteor.user()) {
            return true;
        }
        return false;
    },
    
    //Return profile name if OAuth user, email otherwise
    username: function() {
        if (Meteor.user().profile.name) {
            return Meteor.user().profile.name;
        }
        return Meteor.user().emails[0].address;
    }
});
