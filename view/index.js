'use_strict';

var path = require('path');
var generators = require('yeoman-generator');


/**
 * Lemon View Yo Generator.
 *
 * Create a single page application on the fly – pull down the python
 * dependencies, the javascript dependencies.
 *
 * @author Michael Ortali <mortali@theorchard.com>
 * @constructor
 * @extends {generators.Base}
 */
var ViewGenerator = generators.Base.extend(
    /** @lends {ViewGenerator.prototype} */ {
    askFor: function () {
        var done = this.async();

        var prompts = [PROMPT_VIEW_NAME];

        this.package = this.config.getAll();
        console.log(this.package);

        this.prompt(prompts, function (props) {
            this.package = this.config.getAll();
            this.package['viewName'] = props[PROMPT_VIEW_NAME.name];
            done();
        }.bind(this));
    },

    app: function() {
        var viewParts = this.package.viewName.split('/');
        var viewName = viewParts.concat(
            viewParts[viewParts.length -1 ]).join('/');
        var path = this.package.viewPath;

        ['.js', '.tests.js', '.yml',
         '.scss', '.nunjucks'].forEach(function(ext) {
           this.template('View' + ext, path + viewName + ext);
        }, this);
    }
});


var PROMPT_VIEW_NAME = {
    type: 'input',
    name: 'viewName',
    message: 'View name',
    required: true
};

module.exports = ViewGenerator;
