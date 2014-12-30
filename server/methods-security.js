//Security check

Meteor.methods({

    //Helper function to check if the logged-in user is the owner of the given presentation
    'hasAccessToPresentation': function(parentPresId) {
        var ownerId = Presentations.findOne({
            '_id': parentPresId
        }, {
            ownerId: 1,
            _id: 0
        }).ownerId;

        //false if no user is logged-in 
        //   or if we can't find the logged user 
        //   or if the logged user do not owne the presentation he try to access
        return Meteor.userId() == ownerId;
    },

})
