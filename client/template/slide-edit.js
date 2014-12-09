Template.slideEdit.helpers(
{
    'log': function()
    {
        console.log(this)
    },
    'trimedContent':function() {
    	return this.content.trim()
    }
});

Template.slideEdit.events(
{
    'click #submitChanges': function(event)
    {
        newContent = document.getElementById("textAreaContent").value
        Meteor.call('updateSlideContent', this.parentPresId,this.timeline,this.state,newContent);
    },
});
