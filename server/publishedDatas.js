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

Meteor.publish("presentations", function(){
	return Presentations.find();
});
