Presentations = new Mongo.Collection('presentations');

Slides = new Mongo.Collection('slides');

var imageStore = new FS.Store.GridFS("images", {});

Images = new FS.Collection('images', {stores: imageStore});
