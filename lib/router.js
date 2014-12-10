Router.configure(
{
    //general app-wide configurations goes here
    /*    load: function() {
            $('html, body').animate({
                scrollTop: 0
            }, 400)
            $('.content').hide().fadeIn(1000)
        },*/
})


Router.map(function()
{
    //routes goes here
    this.route('home',
    {
        path: '/',
        layoutTemplate: 'appBody',
    });

    this.route('presentations',
    {
        //name for references in link
        name: 'presentation.index',
        //what the url will look like
        path: '/presentations',
        //the generic layout of the page(navBar,footer, ...)
        layoutTemplate: 'appBody',
        //the useful layout of the page (a template name)
        template: 'presentations',
        //wait for what we need to render this page (mainly subscription to collections)
        waitOn: function()
        {
            return [Meteor.subscribe('presentations')];
        },
    }, function() {});

    this.route('user',
    {
        layoutTemplate: 'appBody',
        template: 'authenticatedUser',

        waitOn: function()
        {
            return [Meteor.subscribe('userData')];
        }
    }, function() {});

    this.route('presentations/:_id',
    {
        //name for references in link
        name: 'presentation.overview',
        //the generic layout of the page(navBar,footer, ...)
        layoutTemplate: 'appBody',
        //the useful layout of the page (a template name)
        template: 'presentationOverview',
        //wait for what we need to render this page (mainly subscription to collections)
        waitOn: function()
        {
            return [
                Meteor.subscribe('presentations'),
                Meteor.subscribe('slides'),
                Meteor.subscribe('images'),
            ];
        },
        //data to pass to the template
        data: function()
        {
            //get one presentation from the parameters
            //maybe check if you are allowed to do this ?
            return Presentations.findOne(
            {
                _id: this.params._id
            });
        },
    }, function() {});

    //lead to One presentation and One timeline
    this.route('presentations/:_id/:timeline/view/',
    {
        //name for references in link
        name: 'presentation.view',
        //the generic layout of the page (navbar, footer...)
        //layoutTemplate: 'presentationView',
        //the useful layout of the page (a template name)
        template: 'presentationView',
        //wait for what we need to render this page (mainly subscription to collections)
        waitOn: function()
        {
            return [
                Meteor.subscribe('presentations'),
                Meteor.subscribe('slides'),
                Meteor.subscribe('images')
            ];
        },
        //data to pass to the template
        data: function()
        {

            templateData = {
                    presentation: Presentations.findOne(
                    {
                        _id: this.params._id
                    }),
                    timelineIndex: this.params.timeline //this index need to be checked before returning the page
                }
                //get one presentation from the parameters
            return templateData;
        },
    });

    //lead to all public timelines of a presentation if not logged in
    //if logged in, to all timelines
    this.route('presentations/:_id/view/',
    {
        //name for references in link
        name: 'presentation.view.general',
        action: function()
        {
            Router.go('presentation.view',
            {
                _id: this.params._id,
                timeline: 0 //the maintimeLine, always public
            });
        }
    });


    //Edition of a slide in One timeline, One state and One presentation
    this.route('presentations/:_id/:timeline/:state/edit/',
    {
        //name for references in link
        name: 'slide.edit',
        //the generic layout of the page (navbar, footer...)
        //layoutTemplate: 'presentationView',
        //the useful layout of the page (a template name)
        template: 'slideEdit',
        //wait for what we need to render this page (mainly subscription to collections)
        waitOn: function()
        {
            return [
                Meteor.subscribe('slides'),
            ];
        },
        //data to pass to the template
        data: function()
        {
            parentPresId = this.params._id
            timelineName = this.params.timeline
            stateNumber = this.params.state

            return Slides.findOne({
                'ownerId': Meteor.userId(),
                'parentPresId': parentPresId,
                'timeline': timelineName,
                'state': parseInt(stateNumber)
            });
        },
    });
});
