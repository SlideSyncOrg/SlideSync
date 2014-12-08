Template.presentationOverview.created = function()
{
    //When the template is created, store the presentation id in session
    Session.set("thePrez", this.data._id);
};


Template.presentationOverview.helpers(
{
    'gimmeStatesArray': function()
    {
        //Generate an array of sized statesCount containing [1,2,3,...]
        var N = this.statesCount;
        var res = [];
        for (var i = 1; i <= N; i++)
        {
            res.push(
            {
                index: i
            });
        }
        return res;
    },

    'displayStateCount': function()
    {

        return this.statesCount;
    },

    'relatedSlide': function(timelineName, state)
    {
        var founded = 'nothing';
        
        //Search through slides array to find those with given timeline and state
        Presentations.findOne({_id: Session.get("thePrez")}).slides.forEach(function(slide)
        {
            if (slide.timeline == timelineName && slide.state == state)
            {
                founded = slide.content;
            };
        });
        return founded

    },

});


Template.presentationOverview.events(
{
    //Add a new state to this presentation
    'click .addState': function(event)
    {
        Meteor.call('addState', Session.get('thePrez'));
    },

    //Add a new timeline to this presentation
    'submit #addTimeline': function(event)
    {
        var title = event.target.title.value;
        var isPublic = event.target.isPublic.checked;

        Meteor.call('addTimeline', Session.get('thePrez'), title, isPublic);

        // Clear form
        event.target.title.value = "";

        //Prevent the page to reload
        return false;
    },
    
    //As found at https://gist.github.com/dariocravero/3922137
    'change #imageUpload': function(event) {
        console.log("Upload an image")
        _.each(event.srcElement.files, function(file) {
            Meteor.saveFile(file, file.name);
        });
    }
});

//As found at https://gist.github.com/dariocravero/3922137
Meteor.saveFile = function(blob, name, path, type, callback) {
  var fileReader = new FileReader(),
    method, encoding = 'binary', type = type || 'binary';
  switch (type) {
    case 'text':
      // TODO Is this needed? If we're uploading content from file, yes, but if it's from an input/textarea I think not...
      method = 'readAsText';
      encoding = 'utf8';
      break;
    case 'binary': 
      method = 'readAsBinaryString';
      encoding = 'binary';
      break;
    default:
      method = 'readAsBinaryString';
      encoding = 'binary';
      break;
  }
  fileReader.onload = function(file) {
    Meteor.call('saveFile', file.srcElement.result, name, path, encoding, callback);
  }
  fileReader[method](blob);
}
