//API concerning presentations

Meteor.methods({
    //Add a new presentation
    'insertPresentation': function(title) {
        //Security check
        if (!Meteor.user()) {
            console.log("Someone tried to make a presentation named " + title + " without being logged in.");
        } else {

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
            }, function(err, result) {
                if (err) throw err;
                console.log("Create a new presentation called " + title)
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
            //Delete the parent object (with timeline and state)
            Presentations.remove({
                '_id': parentPresId
            }, function(err, recordsRemoved) {
                if (err) throw err;
                console.log("Remove a presentation " + parentPresId)
            });

            //remove the slides child
            Slides.remove({
                'parentPresId': parentPresId
            }, function(err, recordsRemoved) {
                if (err) throw err;
                console.log("and " + recordsRemoved + " attached slides")
            });
        }
    },

    //Generate a shortened URL to make it easy for viewers to find presentation,
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
});
