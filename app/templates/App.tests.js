goog.require('lemon.tests');


goog.require('<%= package.appName %>.<%= package.appView %>');
goog.require('<%= package.appName %>.<%= package.appView %>.yml');


describe('<%= package.appView %>', function() {
    var test = lemon.tests.init(
        <%= package.appName %>.<%= package.appView %>, <%= package.appName %>.<%= package.appView %>.yml);
});
