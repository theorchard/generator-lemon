/**
 * Configuration for Lemon.
 *
 * The configuration file provides all the different paths for the application
 * including external dependencies (bower).
 *
 * @author Michael Ortali <mortali@theorchard.com>
 * @date October 7th, 2014
 */

var gulp = require('gulp');
var lemon = require('lemon');

// Destination directory.
var staticDir = '<%= package.appName %>/static/';


/**
 * Create the destination folder.
 *
 * @return {stream} The gulp stream.
 */
var dest = function() {
    return gulp.dest(staticDir);
};


/**
 * Health Status the of the build.
 *
 * The status of the build provides an indicator if an error has happened. The
 * software will fully execute until the end – then fail if the error has been
 * triggered, or continue if everything is in good standing.
 *
 * @type {boolean} True: all good, False: something has happened.
 */
var status = true;


/**
 * Trigger the build to fail by setting the status of the build to false.
 */
var triggerFailure = function() {
    status = false;
};


/**
 * Get the status of the build.
 *
 * @return {boolean} The status of the build.
 */
var getStatus = function() {
    return status;
};


module.exports = {
    // Name of the bundles (without extension.)
    appBundleName: 'bundle.app',
    externBundleName: 'bundle.externs',

    // Location of all the bower components.
    bower: lemon.bower,

    // Static directory.
    staticDir: staticDir,

    // Where all the files should live.
    dest: dest,

    // General files: libraries, namespace, views.
    libs: '<%= package.appName %>/libs/*',
    jsNamespace: '<%= package.appName %>/libs/<%= package.appName %>.js',
    views: '<%= package.appName %>/<%= package.viewPath %>**/*',
    viewsPath: '<%= package.appName %>/<%= package.viewPath %>',
    viewsDescriptions: '<%= package.appName %>/<%= package.viewPath %>**/*.yml',
    viewsTemplates: '<%= package.appName %>/<%= package.viewPath %>**/*.nunjucks',
    viewsJs: '<%= package.appName %>/<%= package.viewPath %>**/*.js',
    viewsController: '<%= package.appName %>/<%= package.viewPath %>**/!(*tests).js',
    viewsTests: '<%= package.appName %>/<%= package.viewPath %>**/*.tests.js',
    tests: 'tests/**/*.js',

    linters: {
        files: {
            scss: [
                '<%= package.appName %>/views/**/*.scss'],
            py: [
                '<%= package.appName %>/**/*.py',
                'tests/**/*.py'],
            js: [
                '<%= package.appName %>/libs/*.js',
                '<%= package.appName %>/<%= package.viewPath %>/**/*.js']
        },

        jsHintGlobals: {
            '$': false,
            '_': false,
            'Backbone': false,
            'console': true,
            'goog': false,
            'jQuery': false,
            'require': false,
            'lemon': false,
            '<%= package.appName %>': false,
            'it': false,
            'describe': false,
            'sinon': false,
            'assert': false
        },

        onFail: triggerFailure
    },

    getStatus: getStatus
};
