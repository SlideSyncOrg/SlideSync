Template.presentationView.created = function()
{
    Session.set("sideBarHided", false);

    //When the template is created, store the presentation object in session
    Session.set("thePrez", this.data.presentation);

    document.addEventListener('keydown', function(event)
    {
        switch (event.keyCode)
        {
            case 39: // Right arrow
                event.preventDefault();
                Meteor.call('nextState', Session.get('thePrez')._id);
                break;
            case 37: // Left arrow
                event.preventDefault();
                Meteor.call('previousState', Session.get('thePrez')._id);
                break;
        }
    }, false);
};

Template.presentationView.helpers(
{
    'currentTimeline': function()
    {
        return this.presentation.timelines[this.timelineIndex].title;
    },

    'currentState': function()
    {
        //Return state;
        return this.presentation.currentState;
    },

    'currentContent': function()
    {
        var content = "We got nothing";
        var timelineTitle = this.presentation.timelines[this.timelineIndex].title;
        var stateNumber = this.presentation.currentState;

        //Go through slides array and find the one with current timeline and state
        this.presentation.slides.forEach(function(slide)
        {
            if (slide.timeline == timelineTitle && slide.state == stateNumber)
            {
                content = slide.content;
            }
        });

        return content;
    },

    'isOwner': function()
    {
        return Session.get('thePrez').ownerId === Meteor.userId();
    },

    'owner': function()
    {
        return Session.get('thePrez').owner;
    },

    'isAuthorized': function(currentTimelineIndex)
    {
        return Session.get('thePrez').ownerId === Meteor.userId() || Session.get('thePrez').timelines[currentTimelineIndex].isPublic;
    },

    'isSidebarToggled': function()
    {
        return Session.get("sideBarHided");
    },


    'getUrlData': function() {
        return {
            _id:Session.get("thePrez")._id,
            timeline:this.index
        }
    },


});

Template.presentationView.events(
{
    'click #nextState': function(event)
    {
        Meteor.call('nextState', this.presentation._id);
    },

    'click #previousState': function(event)
    {
        Meteor.call('previousState', this.presentation._id);
    },

    'click #toggleSidebar': function(event)
    {
        $("#wrapper").toggleClass("toggled");
        Session.set("sideBarHided", !Session.get("sideBarHided"));
    },

});
