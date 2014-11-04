/**
 * Lemon GulpFile.
 *
 * The Lemon GulpFile contains all the tasks to generate the minified js files,
 * the minified scss files and the watchers (for developer environments.) The
 * goal of those processes is to create a simple workflow in which changes are
 * automatically picked up.
 *
 * @author Michael Ortali <mortali@theorchard.com>
 * @date September 26th, 2014
 */

var tasks = require('require-dir')('./tasks');
var config = require('./configs/lemon');

var gulp = require('gulp');
var linters = require('gulp-linters');

linters.register(gulp, config.linters);

gulp.task('all', ['linter:python', 'javascript:all', 'stylesheet:bundle']);
gulp.task('watch', ['all', 'javascript:watch', 'stylesheet:watch']);


/**
 * The jenkins task fails after the build is complete if an error has been
 * found.
 */
gulp.task('jenkins', ['linter:python', 'linter:js', 'stylesheet:bundle'], function() {
    var gutil = requwire('gulp-util');
    if (!config.getStatus()) {
        throw new Error(
            '\n\n' +
            'Some issues have been found with the code. ' +
            'Please address.\n\n');
    }
});
