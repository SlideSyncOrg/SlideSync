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
    }, function() {
        
    });

    this.route('user', {
        layoutTemplate: 'appBody',
        template : 'authenticatedUser'
    }, function() {
        
    })
});
