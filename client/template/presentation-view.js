Template.presentationView.helpers({
    'currentTimeline': function() {
        // return this.templateData.timelines[0].title;
        return this.presentation.timelines[this.timelineIndex].title;
    },
    
    'currentState': function() {
        //return state;
        return this.presentation.currentState;
    },
    
    'currentContent': function() {
        var content = "We got nothing";
        var timelineTitle = this.presentation.timelines[this.timelineIndex].title;
        var stateNumber = this.presentation.currentState;
        // console.log("Getting content for timeline " + timelineTitle + " and state " + stateNumber);
        this.presentation.slides.forEach(function(slide) {
            if (slide.timeline == timelineTitle && slide.state == stateNumber) {
                content = slide.content;
            }
        });
        return content;
    },
    
    'isOwner': function () {
        return this.presentation.ownerId === Meteor.userId();
    },
    
    'owner': function () {
        return this.presentation.owner;
    },
    
    'isAuthorized': function () {
        return this.presentation.ownerId === Meteor.userId() || this.presentation.timelines[this.timelineIndex].isPublic;
    }
});

Template.presentationView.events({
    'click #nextState': function(event) {
        // console.log("Next clicked.")
        Meteor.call('nextState', this.presentation._id);
    },
    
    'click #previousState': function(event) {
        // console.log("Previous Clicked.")
        Meteor.call('previousState', this.presentation._id);
    },

    'click #toggleSidebar':function(event){
        $("#wrapper").toggleClass("toggled");
    }
});
