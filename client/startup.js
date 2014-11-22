if (Meteor.isClient) {

    Meteor.startup(function() {
        Notifications.settings.animationSpeed = 800;
        _.extend(Notifications.defaultOptions, {
            timeout: 2000
        });
    });

}
