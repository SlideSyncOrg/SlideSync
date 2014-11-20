ServiceConfiguration.configurations.remove({
    service: "github",
});
ServiceConfiguration.configurations.remove({
    service: "google",
});


ServiceConfiguration.configurations.insert({
    service: "github",
    clientId: "4ee2a9ed8f9ac2ed3560",
    loginStyle: "popup",
    secret: "c62460327629f4e38d3adb1517d97a103b3b5bb4"
});

ServiceConfiguration.configurations.insert({
    service: "google",
    clientId: "415161235737-cmt148ut61mkthnlfr0q224phukmciar.apps.googleusercontent.com",
    loginStyle: "popup",
    secret: "HS1I9oNJg1yBVGj0aM_9ShK_"
});


Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        user.profile = options.profile;
    }

    user.profile = _.pick(options.profile,
        "login",
        "name",
        "avatar_url",
        "url",
        "company",
        "blog",
        "location",
        "email",
        "bio",
        "html_url");

    return user;
});
