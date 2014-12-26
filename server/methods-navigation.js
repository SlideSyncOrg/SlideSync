//API  used to navigate through states in a presentation

Meteor.methods({


    //Advance to next state being presented
    'nextState': function(parentPresId) {
        //Security check
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to move forward in " + parentPresId);
        } else {
            //Find this presentation
            var thePres = Presentations.findOne({
                '_id': parentPresId
            });

            //Check if we are at last state
            if (thePres.currentState >= thePres.statesCount) {
                //Do nothing
                return false;
            } else {
                //Common case
                Presentations.update({
                    '_id': parentPresId
                }, {
                    $inc: {
                        'currentState': 1
                    }
                });
            };
        }
    },


    //Go back to previous state being presented
    'previousState': function(parentPresId) {
        //Security check
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to move backwards in " + parentPresId);
        } else {
            //Find this presentation
            var thePres = Presentations.findOne({
                '_id': parentPresId
            });
            //Check if we are at first state
            if (thePres.currentState <= 1) {
                //Do nothing
                return false;
            } else {
                //Common case
                Presentations.update({
                    '_id': parentPresId
                }, {
                    $inc: {
                        'currentState': -1
                    }
                });
            };
        }
    },

});
