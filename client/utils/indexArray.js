// from http://stackoverflow.com/questions/24225071/how-can-i-get-the-index-of-an-array-in-a-meteor-template-each-loop

UI.registerHelper('addIndex', function (all) {
    return _.map(all, function(val, index) {
        return {index: index, value: val};
    });
});