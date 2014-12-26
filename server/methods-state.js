//API concerning state


Meteor.methods({

    //Add a state to the given presentation
    'addState': function(parentPresId) {
        //Security check
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to add a state to " + parentPresId + " without being logged in.");
        } else {
            console.log("Add new state to " + parentPresId);

            //Get array of timelines
            var timelines = Presentations.findOne({
                '_id': parentPresId
            }).timelines;

            //Increment total number of states, get that new total
            Presentations.update({
                '_id': parentPresId
            }, {
                $inc: {
                    'statesCount': 1
                }
            });

            var numState = Presentations.findOne({
                '_id': parentPresId
            }).statesCount;

            //For each timeline, add new slide with new highest state
            for (x = 0; x < timelines.length; x++) {

                Meteor.call('addSlide',
                    parentPresId,
                    timelines[x].title,
                    numState,
                    "This is the <b>content</b> for slide " + numState + " of timeline " + timelines[x].title);
            };
        }
    },

    'removeState': function(parentPresId, stateNumber) {
        //Security check
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to remove a state from " + parentPresId + " without being logged in.");
        } else {
            console.log("Remove the state", stateNumber, "from", parentPresId);

            //
            //decrement total number of states, get that new total
            Presentations.update({
                '_id': parentPresId
            }, {
                $inc: {
                    'statesCount': -1
                }
            });

            //remove related slides
            Slides.remove({
                'parentPresId': parentPresId,
                'state': stateNumber,
            }, function(err, result) {
                if (err) throw err;
                console.log(result, "slide(s) removed related to presentation ", parentPresId, " and state ", stateNumber);
            });

            Slides.update({
                'parentPresId': parentPresId,
                'state': {
                    '$gt': stateNumber
                },
            }, {
                $inc: {
                    'state': -1
                }
            }, function(err, result) {
                if (err) throw err;
                console.log(result, "slide(s) updated related to presentation ", parentPresId, " and state ", stateNumber);
            });
        }
    },
    })
