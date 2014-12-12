Template.slideEdit.events({

    'click #goBack': function() {
        Router.go('presentation.overview', {'_id':this.parentPresId})
    },

});

/*--------------------------Image uploader code*/
Template.imageUploader.helpers({
    'randImg': function() {
        return Images.findOne();
    },

    'imgs': function() {
        res = Images.find();
        console.log(res.fetch());
        return res
    },
});

Template.imageUploader.events({
    //As found at https://gist.github.com/dariocravero/3922137
    'change #imageUpload': function(event, template) {
        //console.log(event);
        FS.Utility.eachFile(event, function(file) {
            var newFile = new FS.File(file);
            Images.insert(newFile, function(err, fileObj) {
                console.log(err);
                console.log(fileObj);
                //If !err, we have inserted new doc with ID fileObj._id, and
                //kicked off the data upload using HTTP
            });

        });
    },

    'click .anImage': function() {
        console.log(this)
        Session.set("selectedImage", this._id);
    },

    'click #submitNewContent': function() {
        console.log("selected image",Session.get("selectedImage"))
        console.log("type of slide  true -> html editor false -> image uploader", Session.get("currentEditor"))




        // image uploader
        Meteor.call('updateSlideContent', this.parentPresId, this.timeline, this.state, false/*imageUpload*/, Session.get("selectedImage"));

    },
});


/*--------------------------html editor code*/
Template.htmlEditor.helpers({
    'getEditorContent': function() {
        // console.log(document.getElementById("textAreaContent"))

        // currentContent = document.getElementById("textAreaContent")
        // console.log("what we get from text area", currentContent)
        // if (currentContent == "") {
        return this.content;
        // } else {
        //     return currentContent
        // }
    },

    'trimedContent': function() {
        return this.content.trim()
    },
});
Template.htmlEditor.events({

    'click #previewChanges': function(event) {
        newContent = document.getElementById("textAreaContent").value
            // Meteor.call('updateSlideContent', this.parentPresId, this.timeline, this.state, newContent);
    },

    'click #submitNewContent': function() {
        //html editor
        newContent = document.getElementById("textAreaContent").value
        Meteor.call('updateSlideContent', this.parentPresId, this.timeline, this.state,true/*html*/, newContent);

    },

});
