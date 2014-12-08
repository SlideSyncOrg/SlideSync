Template.slideEdit.helpers(
{
    'log': function()
    {
        console.log(this)
    },
});

Template.slideEdit.events(
{
    'click #submitChanges': function(event)
    {
        console.log(document.getElementById("textAreaContent").value)
        Meteor.call('updateSlideContent', 1, function (error, result) {});
    },
});
