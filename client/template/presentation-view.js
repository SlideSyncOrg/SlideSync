Template.presentationView.created = function()
{

    Session.set("sideBarHided", false);

    //when the template is created, store the presentation object in session
    Session.set("thePrez", this.data.presentation);

    console.log(this.data.presentation);
};

Template.presentationView.helpers(
{
    'currentTimeline': function()
    {
        //TODO: figure out how to extract the timeline
        //from the view URL. The router has a var 'timeline'
        //but I do not know how to access it here.
        // return this.templateData.timelines[0].title;
        return this.presentation.timelines[this.timelineIndex].title;
    },

    'currentState': function()
    {
        //return state;
        return this.presentation.currentState;
    },

    'currentContent': function()
    {
        var content = "We got nothing";
        var timelineTitle = this.presentation.timelines[this.timelineIndex].title;
        var stateNumber = this.presentation.currentState;
        // console.log("Getting content for timeline " + timelineTitle + " and state " + stateNumber);
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
        // console.log("Next clicked.")
        Meteor.call('nextState', this.presentation._id);
    },

    'click #previousState': function(event)
    {
        // console.log("Previous Clicked.")
        Meteor.call('previousState', this.presentation._id);
    },

    'click #toggleSidebar': function(event)
    {
        $("#wrapper").toggleClass("toggled");
        Session.set("sideBarHided", !Session.get("sideBarHided"));
    }
});
