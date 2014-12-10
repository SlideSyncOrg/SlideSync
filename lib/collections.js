Presentations = new Mongo.Collection('presentations');

Slides = new Mongo.Collection('slides');

Images = new FS.Collection("images", {
    stores: [
      new FS.Store.GridFS("images")
    ],
    filter: {
      allow: {
        contentTypes: ['image/*'] //allow only images in this FS.Collection
      }
    }
});
