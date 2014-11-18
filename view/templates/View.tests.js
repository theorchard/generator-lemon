goog.require('lemon.tests');

goog.require('<%= package.appName %>.<%= package.viewName %>');
goog.require('<%= package.appName %>.<%= package.viewName %>.yml');


describe('<%= package.viewName %>', function() {
    var test = lemon.tests.init(
        <%= package.appName %>.<%= package.viewName %>,
        <%= package.appName %>.<%= package.viewName %>.yml);

    // Example of a test.
    // test.describe('Description of the scenario', null, function(view) {
    //     it('explains what happens', function() {
    //
    //     })
    // });
});
