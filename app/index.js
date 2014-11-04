'use_strict';

var path = require('path');
var generators = require('yeoman-generator');


/**
 * Lemon Yo Generator.
 *
 * Create a single page application on the fly – pull down the python
 * dependencies, the javascript dependencies.
 *
 * @author Michael Ortali <mortali@theorchard.com>
 * @constructor
 * @extends {generators.Base}
 */
var LemonGenerator = generators.Base.extend(
    /** @lends {LemonGenerator.prototype} */ {
    /**
     * Request information from the user.
     */
    askFor: function () {
        var done = this.async();

        var prompts = [
            PROMPT_APPLICATION_NAME,
            PROMPT_AUTHOR_NAME,
            PROMPT_AUTHOR_EMAIL,
            PROMPT_APPLICATION_VERSION,
            PROMPT_APPLICATION_DESCRIPTION,
            PROMPT_INPUT_VIEW_PATH,
            PROMPT_APPLICATION_VIEW_NAME,
            PROMPT_APPLICATION_DEBUG_MODE,
            PROMPT_ENABLE_I18N];

        this.prompt(prompts, function (props) {
            this.package = {
                appName: props[PROMPT_APPLICATION_NAME.name],
                appView: props[PROMPT_APPLICATION_VIEW_NAME.name],
                author: {
                    name: props[PROMPT_AUTHOR_NAME.name],
                    email: props[PROMPT_AUTHOR_EMAIL.name]
                },
                created: {
                    day: new Date().getDay(),
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear()
                },
                description: props[PROMPT_APPLICATION_DESCRIPTION.name],
                isDebug: props[PROMPT_APPLICATION_DEBUG_MODE.name],
                enableI18n: props[PROMPT_ENABLE_I18N.name],
                version: props[PROMPT_APPLICATION_VERSION.name],
                viewPath: props[PROMPT_INPUT_VIEW_PATH.name]
            };
            done();
        }.bind(this));
    },

    /**
     * Fill all the information in the templates.
     */
    app: function() {
        var pkg = this.package;
        var viewPath = pkg.appName + '/' + pkg.viewPath;
        var appViewPath = pkg.appName + '/' + pkg.viewPath + pkg.appView;
        var appViewFiles = appViewPath + '/' + pkg.appView;

        this.config.set('appName', pkg.appName);
        this.config.set('viewPath', viewPath);

        this.mkdir('tasks');
        this.mkdir('tests');
        this.mkdir(pkg.appName);
        this.mkdir(viewPath);
        this.mkdir(appViewPath);
        if (pkg.enableI18n) {
            this.mkdir(pkg.appName + '/translations/');
        }

        // Create files from the templates (if they don't require specific
        // urls)
        MAIN_TEMPLATES.forEach(function(tpl) {
            this.template(tpl, tpl);
        }, this);

        // Custom locations.
        this.template('app.py', pkg.appName + '/app.py');
        this.template('routes.py', pkg.appName + '/routes.py');
        this.template('namespace.js',
            pkg.appName + '/libs/' + pkg.appName + '.js');

        // Create all files for the the application view.
        ['.js', '.nunjucks', '.scss', '.tests.js'].forEach(function(ext) {
            this.template('App' + ext, appViewFiles + ext);
        }, this);
    },

    end: function() {
        this.installDependencies();
        this.spawnCommand('make', ['install']);
        this.spawnCommand('npm', ['run build']);
    }
});


// List of the main templates. None of those templates require a specific path
// and will be copied from one directory onto another one.
var MAIN_TEMPLATES = [
    'Makefile',
    'configs/babel.cfg',
    'configs/lemon.js',
    'gulpfile.js',
    'package.json',
    'requirements.txt',
    'server.py',
    'tasks/javascript.js',
    'tasks/karma.js',
    'tasks/stylesheet.js'];

// Prompts.
var PROMPT_APPLICATION_NAME = {
    type: 'input',
    name: 'appName',
    message: 'Lemon Application Name',
    default: 'Lemon'
};

var PROMPT_AUTHOR_NAME = {
    type: 'input',
    name: 'authorName',
    message: 'Package author name',
    required: true
};

var PROMPT_AUTHOR_EMAIL = {
    type: 'input',
    name: 'authorEmail',
    message: 'Package author email',
    required: true
};

var PROMPT_APPLICATION_VERSION = {
    type: 'input',
    name: 'version',
    message: 'Package initial version',
    default: '0.1.0'
};

var PROMPT_APPLICATION_DESCRIPTION = {
    type: 'input',
    name: 'description',
    message: 'Application description:',
    default: 'An awesome lemon app'
};

var PROMPT_INPUT_VIEW_PATH = {
    type: 'input',
    name: 'viewPath',
    message: 'Location of the views:',
    default: 'views/'
};

var PROMPT_APPLICATION_VIEW_NAME = {
    type: 'input',
    name: 'appView',
    message: 'Name of the main application view',
    default: 'App'
};

var PROMPT_ENABLE_I18N = {
    type: 'confirm',
    name: 'enableI18n',
    message: 'Do you want to enable i18n support?',
    default: true
};

var PROMPT_APPLICATION_DEBUG_MODE = {
    type: 'confirm',
    name: 'isDebug',
    message: 'Do you want this app to be first in debug mode?',
    default: true
};

module.exports = LemonGenerator;
