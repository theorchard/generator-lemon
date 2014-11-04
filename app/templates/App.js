goog.provide('<%= package.appName + '.' + package.appView %>');

goog.require('lemon.views');


/**
 * @extends {lemon.View}
 * @constructor
 */
<%= package.appName + '.' + package.appView %> = lemon.views.register('<%= package.appView %>',
/** @lends {<%= package.appName + '.' + package.appView %>.prototype} */{

    /**
     * Handler for navigate events.
     *
     * This handler takes care of replacing the main view with the subview that
     * had been found.
     *
     * @param {jQuery.Event} evt The jQuery event.
     * @param {Function=} callback Callback.
     * @override
     */
    onNavigate: function(evt, callback) {
        evt.preventDefault();
        var view = evt['view'];
        var mainView = /** @type {lemon.View} */(lemon.views.initialize(view));
        var self = this;

        return mainView.render().done(function() {
            self.children[0].$el.replaceWith(mainView.$el);
            self.removeChild(self.children[0]);
            self.addChild(mainView);

            if (callback) {
                callback();
            }
        });
    }
});
