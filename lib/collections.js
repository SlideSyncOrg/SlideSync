Presentations = new Mongo.Collection('presentations');

Slides = new Mongo.Collection('slides');

Images = new FS.Collection("images", {
    stores: [
        new FS.Store.GridFS("images")
    ],
    filter: {
        maxSize: 1048576, //in bytes
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        },
        onInvalid: function(message) {
            if (Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
        }
    }
});
