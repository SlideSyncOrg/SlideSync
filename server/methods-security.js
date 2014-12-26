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
        return Meteor.userId() == ownerId;
    },

})
