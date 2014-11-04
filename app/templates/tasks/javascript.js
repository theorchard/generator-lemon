/**
 * Javascript task.
 *
 * The Javascript task generates two main bundles. The external bundle contains
 * the data that is related to external dependencies (jquery, underscore, and
 * backbone). The application bundle contains all the views, along with the
 * different internal libraries.
 *
 * Minification and code quality checks are handled by the Google Closure
 * Compiler – which reinforce good coding practices.
 *
 * @author Michael Ortali <mortali@theorchard.com>
 * @date September 30, 2014
 */

var config = require('../configs/lemon');

var chalk = require('chalk');
var closureCompiler = require('gulp-closure-compiler');
var concatenate = require('gulp-concat');
var gulp = require('gulp');
var gutil = require('gulp-util');
var lemon = require('lemon');
var logSymbols = require('log-symbols');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var externals = [
    config.bower + 'jquery/index.js',
    config.bower + 'underscore/index.js',
    config.bower + 'backbone/index.js'];

var files = [
    // Goog basis
    config.bower + 'closurelibrary/closure/goog/base.js'];

files = files.concat(lemon.files);
files = files.concat([
    config.jsNamespace,
    config.libs + '.js',
    config.views + '.js',
    '!' + config.viewsTests]);


/**
 * Main options for the closure compiler.
 *
 * @type {Object}
 */
var closureOptions = {
    // Path of the closure compiler.
    compilerPath: config.bower + 'closure-compiler/compiler.jar',

    // Filename (not versionized.)
    fileName: config.appBundleName + '.js',

    // Flags for the closure compiler.
    compilerFlags: {
        // The closure compiler offers different levels of optimizations:
        // - SIMPLE_OPTIMIZATIONS: minifies (same way UglifyJS2 works)
        // - ADVANCED_OPTIMIZATIONS: minifies, removes dead code, optimize,
        //     do type checks etc.
        compilation_level: 'ADVANCED_OPTIMIZATIONS',

        // Output wrapper: encapsulate the code into an anonymous function, so
        // no malicious script can access the code aside from the methods made
        // public.
        output_wrapper: '(function() {%output%})();',

        // Externals are providing signatures for the methods that are not
        // included in the app bundle (for example: jquery, underscore,
        // backbone).
        externs: [
            config.bower + 'externs-jquery/index.js',
            config.bower + 'externs-underscore/index.js',
            config.bower + 'externs-backbone/index.js'
        ],

        // Additional flags.
        warning_level: 'VERBOSE',
        process_jquery_primitives: true
    },
};


/**
 * Task to generate the main bundle.
 *
 * The main bundle contains the essential libraries (including the namespace)
 * and includes all the different views.
 */
gulp.task('javascript:bundle', ['linter:js'], function() {
    return gulp.src(files)
        .pipe(closureCompiler(closureOptions))
        .on('error', function(err) {
            gutil.log(err.message);
            gutil.log(
                logSymbols.error + ' ' +  chalk.red('js bundle: failed \n'));
            this.emit('end');
        })
        .pipe(config.dest());
});


/**
 * Task to generate the extern bundle.
 *
 * The extern bundles contains all our dependencies. It changes rarely, and
 * is cached on the first request. Dependencies includes: backbone, jquery,
 * and underscore.
 */
gulp.task('javascript:externs', function() {
    return gulp.src(externals)
        .pipe(concatenate(config.externBundleName + '.js'))
        .pipe(uglify())
        .pipe(config.dest());
});


/**
 * Watcher for javascript files.
 *
 * Any changes done to our javascript files will refresh the javascript bundle
 * automatically.
 */
gulp.task('javascript:watch', function() {
    gulp.watch(files, ['javascript:bundle']);
});


/**
 * Main javascript task.
 */
gulp.task('javascript:all', ['javascript:externs', 'javascript:bundle']);
