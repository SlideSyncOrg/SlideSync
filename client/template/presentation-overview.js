Template.presentationOverview.helpers({
    'gimmeStatesArray': function() {
        //generated an array of sized statesCount containing [1,2,3,...]
        var N = this.statesCount;
        var res = [];
        for (var i = 1; i <= N; i++) {
            res.push({
                index: i
            });
        }
        return res;
    },

    'displayStateCount': function() {
        return this.statesCount;
    },

    'relatedSlide': function(timelineName, state) {
        console.log("Call to the relatedSlide function")
        console.log(timelineName);
        console.log(state);


        var founded='nothing';
        //BAAAAAAD should not be related to from where you called the function
        Template.parentData(2).slides.forEach(function(slide) {
            if (slide.timeline == timelineName && slide.state == state) {
                console.log("slide found for parameter : " + timelineName + "  " + state);
                console.log(slide);
                founded =slide;
            };
        });
        // console.log("find nothing")
        // throw new Meteor.error("No slide found for timeline: " + timelineName + "\n  state: " + state);
        return founded

    }
});


Template.presentationOverview.events({
    'click .addState': function(event) {

        Meteor.call('addState', Template.parentData(1)._id);
    },

    'submit #addTimeline': function(event) {
        var title = event.target.title.value;


        Meteor.call('addTimeline', this._id, title);

        // Clear form
        event.target.title.value = "";

        //prevent the page to reload
        return false;
    },
});
