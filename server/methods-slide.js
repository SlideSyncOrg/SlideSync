//API concerning slides
Meteor.methods({

    'updateSlideContent': function(parentPresId, timelineSlugName, stateNumber, isHtml, newContent) {
        //Security check
        if (!Meteor.call('hasAccessToPresentation', parentPresId)) {
            console.log("Someone tried update slide content of ", parentPresId, timelineSlugName, stateNumber);
        } else {
            console.log("Updating content of slide ", parentPresId, timelineSlugName, stateNumber, "with ", newContent)

            //update this precise slide
            Slides.update({
                'ownerId': Meteor.userId(),
                'parentPresId': parentPresId,
                'timeline': timelineSlugName,
                'state': parseInt(stateNumber)
            }, {
                $set: {
                    //replace the content by the given new content
                    'content': newContent,
                    'isHtml': isHtml
                }
            }, function(err, result) {
                if (err) throw err;
            });
        }
    },
    
    'addSlide': function(parentPresId, timelineSlugName, stateNumber, content) {
        //Security check
        if (!Meteor.user()) {
            console.log("Someone tried to add a slide to " + parentPresId + " without being logged in.");
        } else {
            Slides.insert({
                    'ownerId': Meteor.userId(),
                    'parentPresId': parentPresId,
                    'timeline': timelineSlugName,
                    'state': stateNumber,
                    'content': content,
                    'isHtml': true,
                },
                function(err, result) {
                    if (err) throw err;
                    console.log(result, "slide(s) added to presentation ", parentPresId, "timeline", timelineSlugName, " and state ", stateNumber);
                });
        }
    },
});
