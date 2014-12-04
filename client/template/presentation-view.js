Template.presentationView.created = function()
{
    Session.set("sideBarHided", false);

    //When the template is created, store the presentation object in session
    Session.set("thePrez", this.data.presentation);
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

        console.log('try to render html')

        /*        var d = document.getElementById("slideContent");
                d.innerHTML = content;*/
        // var htmlObj = $(content);
        // htmlObj.find("#slideContent").html();

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
    
    'isAuthorized': function () {
        return Session.get('thePrez').ownerId === Meteor.userId() || Session.get('thePrez').timelines[this.timelineIndex].isPublic;
    },

    'renderContent': function()
    {

        // return $('#one').html();
    },

    'isSidebarToggled': function()
    {
        return Session.get("sideBarHided");
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
    }
});
