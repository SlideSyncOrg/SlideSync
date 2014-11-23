Router.configure({
//general app-wide configurations goes here
})


Router.map(function() {
    //routes goes here
    this.route('home', {
        path: '/',
        layoutTemplate: 'appBody',
    });

    this.route('presentations', {
        //what the url will look like
        path: '/prez',
        //the generic layout of the page(navBar,footer, ...)
        layoutTemplate: 'appBody',
        //the useful layout of the page (a template name)
        template: 'presentations',
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
