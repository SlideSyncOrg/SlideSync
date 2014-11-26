Template.presentationOverview.helpers({

    relatedTimelines: function() {
        // return Timelines.find()
        return Timelines.find({
            _id: {
                $in: this.timeLines
            }
        })
    }
});
