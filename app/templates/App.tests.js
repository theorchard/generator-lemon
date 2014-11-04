goog.require('<%= package.appName %>.<%= package.appView %>');


describe('<%= package.appName %>.<%= package.appView %>', function() {
    it('can be called', function() {
        var test = new <%= package.appName %>.<%= package.appView %>();
        test.initialize();
    });
});
