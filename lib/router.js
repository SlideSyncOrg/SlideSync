Router.configure({

})


Router.map(function() {
    //routes goes here
    this.route('home', {
        path: '/',
        layoutTemplate: 'appBody',
    });

    this.route('presentations', {
        path: '/prez',
        layoutTemplate: 'appBody',
        template:'presentations'
        //wait for what we need to render this page (mainly subscription to collections)
        waitOn: function() {
            return Meteor.subscribe('presentations');
        },
    }, function() {
        
    });

    this.route('user', {
        layoutTemplate: 'appBody',
        template : 'authenticatedUser'
    }, function() {
        
    })
});
