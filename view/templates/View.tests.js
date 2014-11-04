goog.require('<%= package.appName %>.<%= package.viewName %>');


describe('<%= package.appName %>.<%= package.viewName %>', function() {
    it('can be called', function() {
        var test = new <%= package.appName %>.<%= package.viewName.replace('/', '.') %>();
        test.initialize();
    });
});
