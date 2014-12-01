Template.presentationView.helpers({
    'currentTimeline': function() {
                                                    //TODO: figure out how to extract the timeline
                                                    //from the view URL. The router has a var 'timeline'
                                                    //but I do not know how to access it here.
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
        console.log("Getting content for timeline " + timelineTitle + " and state " + stateNumber);
        this.presentation.slides.forEach(function(slide) {
            if (slide.timeline == timelineTitle && slide.state == stateNumber) {
                content = slide.content;
            }
        });
        return content;
    },
    
    'isOwner': function () {
        return this.presentation.ownerId === Meteor.userId();
    }
});

Template.presentationView.events({
    'click #nextState': function(event) {
        console.log("Next clicked.")
        Meteor.call('nextState', this._id);
    },
    
    'click #previousState': function(event) {
        console.log("Previous Clicked.")
        Meteor.call('previousState', this._id);
    },

    'click #toggleSidebar':function(event){
        $("#wrapper").toggleClass("toggled");
    }
});
