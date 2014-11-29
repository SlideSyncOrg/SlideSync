//This file contain the API of the application

Meteor.methods({
    'insertPresentation': function(title) {
        //add a new presentation
        //TODO: add a check to make sure the user is logged in
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


        Meteor.call('addTimeline', idPresCreated, 'Main timeline')
        Meteor.call('addState', idPresCreated)
    },

    'deletePresentation': function(presentationToDel) {
        //TODO: add a check to make sure the user is authorized
        console.log("Remove a presentation called " + presentationToDel.title)
        Presentations.remove(presentationToDel);

    },


    'addTimeline': function(parentPresId, name) {
        //TODO: add a check to make sure the user is authorized
        console.log('Add a new timeline called ' + name + " to " + parentPresId)
            //add the newly created timeline to the presentation
        Presentations.update({
            _id: parentPresId
        }, {
            $push: {

                timelines: {
                    title: name,
                }
            }
        });
        var numStates = Presentations.findOne({_id: parentPresId}).statesCount
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
    },

    'addState': function(parentPresId) {
        //TODO: add a check to make sure the user is authorized
        var timelines = Presentations.findOne({_id: parentPresId}).timelines;
        Presentations.update({
            _id: parentPresId
        }, {
            $inc: {
                statesCount: 1
            }
        });
        var numStates = Presentations.findOne({_id: parentPresId}).statesCount;
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
        }
    },
    
    'nextState': function(parentPresId) {
        //TODO: add a check to make sure the user is authorized
        //TODO: add a check to see if this is the last slide
        Presentations.update({
            _id: parentPresId
        }, {
            $inc: {currentState: 1}
        });
    },
    
    'previousState': function(parentPresId) {
        //TODO: add a check to make sure the user is authorized
        //TODO: add a check to see if this is the first slide
        Presentations.update({
            _id: parentPresId
        }, {
            $inc: {currentState: -1}
        });
    }
})
