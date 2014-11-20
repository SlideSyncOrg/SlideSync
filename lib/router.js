Router.configure({
    // we use the  appBody template to define the layout for the entire app
    layoutTemplate: 'appBody',

})


Router.map(function() {
    //routes goes here
    this.route('home', {
        path: '/'
    });
    this.route('presentations',{
    	path: '/prez'
    }, function() {
        this.render('presentations');
    })
    this.route('user', function() {
        this.render('authenticatedUser');
    })
});
