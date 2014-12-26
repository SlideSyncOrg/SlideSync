//API concerning timelines

Meteor.methods({
//Add a timeline with given name, public status to given presentation
    'addTimeline': function(parentPresId, name, public) {
        //Security check
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to add a timeline to " + parentPresId + " without being logged in.");
        } else {
            console.log('Add a new timeline called ' + name + " to " + parentPresId)
            sluggedName = Meteor.myFunctions.slug(name)
                //Database call to add timeline
            Presentations.update({
                '_id': parentPresId
            }, {
                $addToSet: {
                    'timelines': {
                        'title': sluggedName,
                        'titleToDisplay': name,
                        'isPublic': public
                    }
                }
            }, function(err, result) {
                if (err) throw err;
                console.log(result, "timeline added named", sluggedName, " to presentation ", parentPresId);
            });

            //For each state, add a slide to the new timeline
            var numStates = Presentations.findOne({
                _id: parentPresId
            }).statesCount
            for (x = 1; x <= numStates; x++) {

                Meteor.call('addSlide',
                    parentPresId,
                    sluggedName,
                    x,
                    "This is the <b>content</b> for slide " + x + " of timeline " + sluggedName);
            }
        }
    },

    'removeTimeline': function(parentPresId, sluggedName) {

        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to remove a timeline to " + parentPresId + " without being logged in.");
        } else {

            console.log("Removing timeline ", sluggedName, " from presentation ", parentPresId)
                //remove the timeline from the presentation
            Presentations.update({
                '_id': parentPresId
            }, {
                '$pull': {
                    'timelines': {
                        'title': sluggedName,
                    }
                }
            }, function(err, result) {
                if (err) throw err;
                console.log(result, "timeline(s) removed from pres ", parentPresId);
            });


            //remove slides related to that presentation
            Slides.remove({
                'parentPresId': parentPresId,
                'timeline': sluggedName,
            }, function(err, result) {
                if (err) throw err;
                console.log(result, "slide(s) removed related to presentation ", parentPresId, " and timeline ", sluggedName);
            });
        }
    },

    'changeTimelineVisibility': function(parentPresId, sluggedName, public) {
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to add a timeline to " + parentPresId + " without being logged in.");
        } else {
            console.log('Change visibility of timeline ' + sluggedName + " to " + public);
            var finded = Presentations.update({
                '_id': parentPresId,
                'timelines': {
                    $elemMatch: {
                        'title': sluggedName,
                    }
                }
            }, {
                $set: {
                    'timelines.$.isPublic': public,
                }
            }, {
                'multi': false
            });
        }
    },
});

