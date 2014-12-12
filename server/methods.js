//This file contain the API of the application

Meteor.methods({
    //Add a new presentation
    'insertPresentation': function(title) {
        //Security check
        if (!Meteor.user()) {
            console.log("Someone tried to make a presentation named " + title + " without being logged in.");
        } else {
            console.log("Create a new presentation called " + title)
            var ownerPrettyName;

            //OAuth users have profile names, email/password users do not.
            if (Meteor.user().profile.name) {
                ownerPrettyName = Meteor.user().profile.name;
            } else {
                ownerPrettyName = Meteor.user().emails[0].address;
            }

            //Initial database call to create presentation
            var idPresCreated = Presentations.insert({
                'owner': ownerPrettyName,
                'ownerId': Meteor.userId(),
                'titleToDisplay': title,
                'title': Meteor.myFunctions.slug(title),
                'createdAt': new Date(), // current time
                'timelines': [],
                'statesCount': 0,
                'currentState': 1
            });
        }


        //Add first timeline, state, and shortened URL
        Meteor.call('addTimeline', idPresCreated, 'Public timeline', true)
        Meteor.call('addTimeline', idPresCreated, 'Main timeline', false)
        Meteor.call('addState', idPresCreated)
        Meteor.call('addShortenUrl', idPresCreated)
    },


    //Delete given presentation
    'deletePresentation': function(parentPresId) {
        //Security check
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried to delete " + parentPresId + " without being logged in.");
        } else {
            console.log("Remove a presentation " + parentPresId)
                //Delete the parent object (with timeline and state)
            Presentations.remove({
                '_id': parentPresId
            });

            //remove the slides child
            Slides.remove({
                'parentPresId': parentPresId
            }, function(error, recordsRemoved) {
                console.log("and " + recordsRemoved + " attached slides")
            });
        }
    },


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

    'addSlide': function(parentPresId, timelineSlugName, numState, content) {
        //Security check
        if (!Meteor.user()) {
            console.log("Someone tried to add a slide to " + parentPresId + " without being logged in.");
        } else {
            Slides.insert({
                'ownerId': Meteor.userId(),
                'parentPresId': parentPresId,
                'timeline': timelineSlugName,
                'state': numState,
                'content': content,
                'isHtml': true,
            });
        }
    },


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

    //Generate a shortened URL to make it easy for viewers to find presentation,
    //as well as provide analytics
    'addShortenUrl': function(presId) {
        console.log("Compute the short url for the presentation : " + presId)
            //Hard coded path to view route for this presentation
        urlToView = 'presentations/' + presId + '/view';

        //Make the request to google url shortener api
        res = Meteor.http.post(
            'https://www.googleapis.com/urlshortener/v1/url', {
                'data': {
                    'longUrl': Meteor.absoluteUrl(urlToView),
                },
                // query: 'key=AIzaSyBagJ1RvyE2FihnhaGuSwg000cxqgWWbK4',
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
        );

        //Find the presentation and insert short URL
        Presentations.update({
            '_id': presId
        }, {
            $set: {
                'shortUrl': res.data.id
            }
        });
    },

    //Helper funching for security checks
    'hasAccessToPresentation': function(parentPresId) {
        var ownerId = Presentations.findOne({
            '_id': parentPresId
        }, {
            ownerId: 1,
            _id: 0
        }).ownerId;
        return Meteor.userId() == ownerId;
    },

    'updateSlideContent': function(parentPresId, timelineName, stateNumber, isHtml, newContent) {
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried update slide content of ", parentPresId, timelineName, stateNumber);
        } else {

            Slides.update({
                'ownerId': Meteor.userId(),
                'parentPresId': parentPresId,
                'timeline': timelineName,
                'state': parseInt(stateNumber)
            }, {
                $set: {
                    'content': newContent,
                    'isHtml': isHtml
                }
            });
        }
    },

    'storeImage': function(file) {
        return Images.insert({
            'data': file
        });
    }
})

