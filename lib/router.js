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
        //name for references in link
        name: 'presentation.index',
        //what the url will look like
        path: '/presentations',
        //the generic layout of the page(navBar,footer, ...)
        layoutTemplate: 'appBody',
        //the useful layout of the page (a template name)
        template: 'presentations',
        //wait for what we need to render this page (mainly subscription to collections)
        waitOn: function() {
            return [Meteor.subscribe('presentations')];
        },
    }, function() {});

    this.route('user', {
        layoutTemplate: 'appBody',
        template: 'authenticatedUser'
    }, function() {});

    this.route('presentations/:_id', {
        //name for references in link
        name: 'presentation.show',
        //the generic layout of the page(navBar,footer, ...)
        layoutTemplate: 'appBody',
        //the useful layout of the page (a template name)
        template: 'presentationOverview',
        //wait for what we need to render this page (mainly subscription to collections)
        waitOn: function() {
            return [Meteor.subscribe('presentations')];
        },
        //data to pass to the template
        data: function() {
            //get one presentation from the parameters
            //maybe check if you are allowed to do this ? 
            return Presentations.findOne({
                _id: this.params._id
            });
        },
    }, function() {});

});
