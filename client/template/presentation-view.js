Template.presentationView.helpers({
    'currentTimeline': function() {
        return this.timelines[0].title;
    },
    
    'currentState': function() {
        return 1;
    },
    
    'currentContent': function(timelineTitle, stateNumber) {
        var content = "We got nothing";
        console.log(Template.parentData(1));
        //var presentation = Presentations.findOne()
        console.log("Getting content for timeline " + timelineTitle + " and state " + stateNumber);
        Template.parentData(1).slides.forEach(function(slide) {
            if (slide.timeline == timelineTitle && slide.state == stateNumber) {
                content = slide.content;
            }
        });
        return content;
    }
});
