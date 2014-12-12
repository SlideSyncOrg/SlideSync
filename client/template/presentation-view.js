Template.presentationView.created = function() {
    Session.set("sideBarHided", false);

    //When the template is created, store the presentation object in session
    Session.set("thePrez", this.data.presentation);

    document.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 39: // Right arrow
                event.preventDefault();
                Meteor.call('nextState', Session.get('thePrez')._id);
                break;
            case 37: // Left arrow
                event.preventDefault();
                Meteor.call('previousState', Session.get('thePrez')._id);
                break;
            case 27: //escape
                event.preventDefault();
                if (Meteor.user()) {

                    Router.go('presentation.overview', {'_id':Session.get("thePrez")._id})
                }
                break;
        }
    }, false);
};

Template.presentationView.helpers({
    'currentTimeline': function() {
        return this.presentation.timelines[this.timelineIndex].titleToDisplay;
    },

    'currentState': function() {
        //Return state;
        return this.presentation.currentState;
    },

    'currentContent': function() {
        var timelineTitle = this.presentation.timelines[this.timelineIndex].title;
        var stateNumber = this.presentation.currentState;


        daSlide = Slides.findOne({
            'parentPresId': Session.get("thePrez")._id,
            'timeline': timelineTitle,
            'state': stateNumber,
        });

        if (daSlide.isHtml) {
            console.log(daSlide.content);
            return daSlide.content
        } else {
            daImage = Images.findOne({
                '_id': daSlide.content
            });
            console.log(daImage);
            return daImage;
        };

    },

    'slideIsHtml': function() {
        var timelineTitle = this.presentation.timelines[this.timelineIndex].title;
        var stateNumber = this.presentation.currentState;
        return Slides.findOne({
            'parentPresId': Session.get("thePrez")._id,
            'timeline': timelineTitle,
            'state': stateNumber,
        }).isHtml;
    },

    'isOwner': function() {
        return Session.get('thePrez').ownerId === Meteor.userId();
    },

    'owner': function() {
        return Session.get('thePrez').owner;
    },

    'isAuthorized': function(currentTimelineIndex) {
        return Session.get('thePrez').ownerId === Meteor.userId() || Session.get('thePrez').timelines[currentTimelineIndex].isPublic;
    },

    'isSidebarToggled': function() {
        return Session.get("sideBarHided");
    },


    'getUrlData': function() {
        return {
            _id: Session.get("thePrez")._id,
            timeline: this.index
        }
    },


});

Template.presentationView.events({
    'click #nextState': function(event) {
        Meteor.call('nextState', this.presentation._id);
    },

    'click #previousState': function(event) {
        Meteor.call('previousState', this.presentation._id);
    },

    'click #toggleSidebar': function(event) {
        $("#wrapper").toggleClass("toggled");
        Session.set("sideBarHided", !Session.get("sideBarHided"));
    },

});
