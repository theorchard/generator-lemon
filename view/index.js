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

        this.template('View.js', path + viewName + '.js');
        this.template('View.tests.js', path + viewName + '.tests.js');
        this.template('View.scss', path + viewName + '.scss');
        this.template('View.nunjucks', path + viewName + '.nunjucks');
    }
});


var PROMPT_VIEW_NAME = {
    type: 'input',
    name: 'viewName',
    message: 'View name',
    required: true
};

module.exports = ViewGenerator;
