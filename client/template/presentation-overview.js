Template.presentationOverview.created = function()
{
    //When the template is created, store the presentation id in session
    Session.set("thePrez", this.data._id);
};


Template.presentationOverview.helpers(
{
    'gimmeStatesArray': function()
    {
        //Generate an array of sized statesCount containing [1,2,3,...]
        var N = this.statesCount;
        var res = [];
        for (var i = 1; i <= N; i++)
        {
            res.push(
            {
                index: i
            });
        }
        return res;
    },

    'displayStateCount': function()
    {

        return this.statesCount;
    },

    'relatedSlide': function(timelineName, state)
    {
        var founded = 'nothing';

        /*  //Search through slides array to find those with given timeline and state
        Presentations.findOne({_id: Session.get("thePrez")}).slides.forEach(function(slide)
        {
            if (slide.timeline == timelineName && slide.state == state)
            {
                founded = slide.content;
            };
        });

        return founded*/
        console.log("relatedslide parameters : ", Session.get("thePrez"), timelineName, state)
        return Slides.findOne(
        {
            'parentPresId': Session.get("thePrez"),
            'timeline': timelineName,
            'state': state,
        }).content;
    },

    'log':function(){
        console.log(this)
    },

    'getEditSlideUrlData': function() {
        //simply format the data for the router
        return {
            _id: Session.get("thePrez"),
            timeline: this.title,
            state: Template.parentData(1).index,
        }
    }

});


Template.presentationOverview.events(
{
    //Add a new state to this presentation
    'click .addState': function(event)
    {
        Meteor.call('addState', Session.get('thePrez'));
    },

    //Add a new timeline to this presentation
    'submit #addTimeline': function(event)
    {
        var title = event.target.title.value;
        var isPublic = event.target.isPublic.checked;

        Meteor.call('addTimeline', Session.get('thePrez'), title, isPublic);

        // Clear form
        event.target.title.value = "";

        //Prevent the page to reload
        return false;
    },
});
