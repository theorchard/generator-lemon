goog.provide('<%= package.appName + '.' + package.viewName %>');

goog.require('lemon.views');


/**
 * TODO: Documentation please.
 *
 * @extends {lemon.View}
 * @constructor
 */
<%= package.appName + '.' + package.viewName %> = lemon.views.register('<%= package.viewName %>',
/** @lends {<%= package.appName + '.' + package.viewName %>.prototype} */{
});
