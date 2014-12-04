Template.presentationOverview.created = function () {
    //when the template is created, store the presentation object in session
    Session.set("thePrez", this.data);
};


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
        // console.log("Call to the relatedSlide function")
        // console.log(timelineName);
        // console.log(state);


        var founded = 'nothing';

        Session.get('thePrez').slides.forEach(function(slide) {
            if (slide.timeline == timelineName && slide.state == state) {
                // console.log("slide found for parameter : " + timelineName + "  " + state);
                // console.log(slide);
                founded = slide.content;
            };
        });
        // console.log("find nothing")
        // throw new Meteor.error("No slide found for timeline: " + timelineName + "\n  state: " + state);
        return founded

    },

});


Template.presentationOverview.events({
    'click .addState': function(event) {
        Meteor.call('addState', Session.get('thePrez')._id);
    },

    'submit #addTimeline': function(event) {
        var title = event.target.title.value;


        Meteor.call('addTimeline', Session.get('thePrez')._id, title);

        // Clear form
        event.target.title.value = "";

        //prevent the page to reload
        return false;
    },
});
