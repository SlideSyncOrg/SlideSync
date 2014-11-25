Meteor.methods({
    'insertPresentation': function(title) {
        //add a new presentation
        console.log("Create a new presentation called " + title)
        Presentations.insert({
            owner: Meteor.user().profile.name,
            ownerId: Meteor.userId(),
            title: title,
            createdAt: new Date() // current time
        });
    },

    'deletePresentation': function(presentationToDel) {

        console.log("Remove a presentation callled " + presentationToDel.title)
        Presentations.remove(presentationToDel);
    },


    'addTimeline':function(parentPresId,name,visilibity){
        //create a new timeline
                Timelines.insert({
            ownerId: Meteor.userId(),
            title:'Main timeline',
            visibility:['ownerOnly'],
            parentPresentationId:idPresCreated,
        }, callback);

        //add the newly created timeline to the presentation
    }
})
