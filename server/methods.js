//This file contain the API of the application

Meteor.methods({
    'insertPresentation': function(title) {
        //add a new presentation
        console.log("Create a new presentation called " + title)
        var idPresCreated = Presentations.insert({
            owner: Meteor.user().profile.name,
            ownerId: Meteor.userId(),
            title: title,
            createdAt: new Date(), // current time
            timelines: [],
            states: []
        });

        Meteor.call('addTimeline', idPresCreated, 'Main timeline', 'ownerOnly')
        Meteor.call('addState', idPresCreated)
    },

    'deletePresentation': function(presentationToDel) {

        console.log("Remove a presentation called " + presentationToDel.title)
        Presentations.remove(presentationToDel);

    },


    'addTimeline': function(parentPresId, name) {
        console.log('Add a new timeline called ' + name + " to " + parentPresId)
            //add the newly created timeline to the presentation
        Presentations.update({
            _id: parentPresId
        }, {
            $push: {
                timelines: {
                    title: name,
                    pointerToSlide: ''
                }
            }
        });
    },

    'addState': function(parentPresId) {
        Presentations.update({
            _id: parentPresId
        }, {
            $push: {
                states: {
                    $each : [{
                        pointerToSlide: ''
                    }],
                }
            }
        });
    }
})
