Template.presentationView.helpers({
    'currentTimeline': function() {
                                                    //TODO: figure out how to extract the timeline
                                                    //from the view URL. The router has a var 'timeline'
                                                    //but I do not know how to access it here.
        return this.timelines[0].title;
    },
    
    'currentState': function() {
        //return state;
        return Template.parentData(1).currentState;
    },
    
    'currentContent': function() {
        var content = "We got nothing";
        console.log(Template.parentData(1));
        var timelineTitle = Template.parentData(1).timelines[0].title;
        var stateNumber = Template.parentData(1).currentState;
        console.log("Getting content for timeline " + timelineTitle + " and state " + stateNumber);
        Template.parentData(1).slides.forEach(function(slide) {
            if (slide.timeline == timelineTitle && slide.state == stateNumber) {
                content = slide.content;
            }
        });
        return content;
    }
});

Template.presentationView.events({
    'click #nextState': function(event) {
        console.log("Next clicked.")
        Meteor.call('nextState', Template.parentData(1)._id);
    },
    
    'click #previousState': function(event) {
        console.log("Previous Clicked.")
        Meteor.call('previousState', Template.parentData(1)._id);
    }
})
