Template.presentationOverview.created = function() {
    //When the template is created, store the presentation id in session
    Session.set("thePrez", this.data._id);

    Session.set("canAddTimeline", "disabled");

};


Template.presentationOverview.helpers({
    'gimmeStatesArray': function() {
        //Generate an array of sized statesCount containing [1,2,3,...]
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

        return Slides.findOne({
            'parentPresId': Session.get("thePrez"),
            'timeline': timelineName,
            'state': state,
        }).content;
    },



    'log': function() {
        console.log(this)
    },

    'getEditSlideUrlData': function() {
        //simply format the data for the router
        return {
            _id: Session.get("thePrez"),
            timeline: this.title,
            state: Template.parentData(1).index,
        }
    },

    'isDisabled': function() {
        return Session.get("canAddTimeline");
    },

});


Template.presentationOverview.events({
    //Add a new state to this presentation
    'click .addState': function(event) {
        Meteor.call('addState', Session.get('thePrez'));
        Notifications.info('New state created !');
    },

    'click #deleteTimeline':function(){
        console.log(Session.get('thePrez'))
        console.log(this.title)
        Meteor.call('removeTimeline',Session.get('thePrez'),this.title);
    },

    //Add a new timeline to this presentation
    'submit #addTimeline': function(event) {
        var title = event.target.title.value;
        var isPublic = event.target.isPublic.checked;

        Meteor.call('addTimeline', Session.get('thePrez'), title, isPublic);

        // Clear form
        event.target.title.value = "";
        event.target.isPublic.checked = false;

        Notifications.info('New timeline '+title+' created !');

        //Prevent the page to reload
        return false;

    },

    'click #visibility': function() {
        //toggle te visibility of a timeline
        Meteor.call('changeTimelineVisibility', Session.get('thePrez'), this.title, !this.isPublic);
    },

    'blur #title': function(event) {
        //on change of title value, check if the name is unique
        var title = event.target.value;


        var nameToCheck = Meteor.myFunctions.slug(title);
        if (nameToCheck != '') {

            timelinesName = this.timelines.map(function(timeline) {
                return timeline.title;
            });

            if (!(_.contains(timelinesName, nameToCheck))) {
                //is unique -> ok
                Session.set("canAddTimeline", "");
            } else {
                //is no unique -> ko
                Session.set("canAddTimeline", "disabled");
            }
        } else {
            // value is required -> ko
            Session.set("canAddTimeline", "disabled");
        }
    },


});
