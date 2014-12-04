//This file contain the API of the application

Meteor.methods({
    'insertPresentation': function(title) {
        //add a new presentation
        if (!Meteor.user()) {
            console.log("Someone tried to make a presentation named " + title + " without being logged in.");
        } else {
            console.log("Create a new presentation called " + title)
            var ownerPrettyName;
            if (Meteor.user().profile.name) {
                ownerPrettyName = Meteor.user().profile.name;
            } else {
                ownerPrettyName = Meteor.user().emails[0].address;
            }
            var idPresCreated = Presentations.insert({
                owner: ownerPrettyName,
                ownerId: Meteor.userId(),
                title: title,
                createdAt: new Date(), // current time
                timelines: [],
                slides: [],
                statesCount: 0,
                currentState: 1
            });
    
    
            Meteor.call('addTimeline', idPresCreated, 'Main timeline', false)
            Meteor.call('addState', idPresCreated)
        }
    },

    'deletePresentation': function(parentPresId) {
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to delete " + parentPresId + " without being logged in.");
        } else {
            console.log("Remove a presentation " + parentPresId)
            Presentations.remove({_id: parentPresId});
        }
    },


    'addTimeline': function(parentPresId, name, public) {
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to add a timeline to " + parentPresId + " without being logged in.");
        } else {
            console.log('Add a new timeline called ' + name + " to " + parentPresId)
                //add the newly created timeline to the presentation
            Presentations.update({
                _id: parentPresId
            }, {
                $push: {
    
                    timelines: {
                        title: name,
                        isPublic: public
                    }
                }
            });
            var numStates = Presentations.findOne({
                _id: parentPresId
            }).statesCount
            for (x = 1; x <= numStates; x++) {
                //var content = "This is the content for slide ""
                Presentations.update({
                    _id: parentPresId
                }, {
                    $push: {
                        slides: {
                            timeline: name,
                            state: x,
                            content: "This is the content for slide " + x + " of timeline " + name
                        }
                    }
                });
            }
        }
    },

    'addState': function(parentPresId) {
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to add a state to " + parentPresId + " without being logged in.");
        } else {
            console.log("Add new state to " + parentPresId);
            var timelines = Presentations.findOne({
                _id: parentPresId
            }).timelines;
            Presentations.update({
                _id: parentPresId
            }, {
                $inc: {
                    statesCount: 1
                }
            });
            var numStates = Presentations.findOne({
                _id: parentPresId
            }).statesCount;
            for (x = 0; x < timelines.length; x++) {
                Presentations.update({
                    _id: parentPresId
                }, {
                    $push: {
                        slides: {
                            timeline: timelines[x].title,
                            state: numStates,
                            content: "This is the content for slide " + numStates + " of timeline " + timelines[x].title
                        }
                    }
                });
            };
        }
    },

    'nextState': function(parentPresId) {
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to move forward in " + parentPresId);
        } else {
            //find this presentation
            console.log("Move forward in a presentation");
            var thePres = Presentations.findOne({
                _id: parentPresId
            });
                //if you try to inc the current state beyond the maximum
            if (thePres.currentState >= thePres.statesCount) {
                //do nothing
                return false;
            } else {
                //common case
                Presentations.update({
                    _id: parentPresId
                }, {
                    $inc: {
                        currentState: 1
                    }
                });
            };
        }
    },

    'previousState': function(parentPresId) {
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to move backwards in " + parentPresId);
        } else {
            //find this presentation
            console.log("Move backward in a presentation");
            var thePres = Presentations.findOne({
                _id: parentPresId
            });
                //if you try to decrease the currentstate bellow 1
            if (thePres.currentState <= 1) {
                //do nothing
                return false;
            } else {
                //common case
                Presentations.update({
                    _id: parentPresId
                }, {
                    $inc: {
                        currentState: -1
                    }
                });
            };
        }
    },
    
    'hasAccessToPresentation': function(parentPresId) {
        var ownerId = Presentations.findOne({_id: parentPresId}, {ownerId : 1, _id : 0}).ownerId;
        return Meteor.userId() == ownerId;
    }
})
