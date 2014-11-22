//Store all the hooks for iron routeur

var IR_Filters = {

    // show login if a guest wants to access private areas
    // Use: {only: [privateAreas] }
    isLoggedIn: function(pause) {
        if (!(Meteor.loggingIn() || Meteor.user())) {
            Notifications.error('Access denied', 'Please login');
            this.redirect('/');
        } else {
            this.next();
        }
    }
};


//User must be loged in before going those roads
Router.before(IR_Filters.isLoggedIn, {
    only: ['presentations', 'user']
})

