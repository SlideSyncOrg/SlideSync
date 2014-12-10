Presentations = new Mongo.Collection('presentations');

Slides = new Mongo.Collection('slides');

var imageStore = new fsStore.GridFS("images", {});

Images = new FS.Collection('images', {stores: imageStore});
