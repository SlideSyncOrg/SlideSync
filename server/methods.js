//This file contain the API of the application

Meteor.methods({
    'insertPresentation': function(title) {
        //add a new presentation
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
            statesCount: -1
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
        Presentations.update(
            {
            _id: parentPresId
            }, 
            {
                $push: 
                {
                    
                    timelines: 
                    {
                        title: name,
                    }
                }
            }
        );
        for (x = 0; x <= Presentations.find({_id: parentPresId}).statesCount; x++) 
        {
            Presentations.update(
                {
                _id: parentPresId
            }, 
            {
                $push: {
                    slides: {
                        timeline: name,
                        state: x,
                        content: null
                    }
                }
             }
            );
        }
    },

    'addState': function(parentPresId) {
        Presentations.update({
            _id: parentPresId
        }, {
            $inc: {statesCount: 1}
        });
    }
})
