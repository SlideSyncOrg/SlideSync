// server
Meteor.publish("userData", function() {
    if (this.userId) {
        return Meteor.users.find({
            _id: this.userId
        });
    } else {
        this.ready();
    }
});

Meteor.publish("presentations", function() {
    if (this.userId) {
        return Presentations.find({
            //only get data the user own
            'ownerId': this.userId
        });
    } else {
        return Presentations.find({});
    }
});

Meteor.publish("slides", function() {
    if (this.userId) {
        return Slides.find({
            // only get our data
            'ownerId': this.userId,
        });
    } else {
        return Slides.find({})
    }
});

Meteor.publish("images", function() {
    return Images.find();
});
