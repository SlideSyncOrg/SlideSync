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
	return Presentations.find({}, {
		/*
		sort: Sort specifier,
		skip: Number,
		limit: Number,
		fields: Field specifier,
		reactive: Boolean,
		transform: Function
		*/
		//only get data the user own
		ownerId: this.userId,
	});
});
