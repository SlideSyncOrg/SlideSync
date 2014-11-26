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
            timeLines: [],
        });

        Meteor.call('addTimeline', idPresCreated, 'Main timeline', 'ownerOnly')
    },

    'deletePresentation': function(presentationToDel) {

        console.log("Remove a presentation callled " + presentationToDel.title)
        Presentations.remove(presentationToDel);
    },


    'addTimeline': function(parentPresId, name, visilibity) {
        console.log('Add a new timeline called ' + name + " to " + parentPresId)
            //create a new timeline
        var idNewTimeline = Timelines.insert({
            ownerId: Meteor.userId(),
            title: name,
            visibility: visilibity,
            parentPresentationId: parentPresId,
        });

        //add the newly created timeline to the presentation
        Presentations.update({
            _id: parentPresId
        }, {
            $addToSet: {
                timeLines: idNewTimeline
            }
        });
    },
})
