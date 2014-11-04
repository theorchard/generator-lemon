/**
 * Stylesheet task
 *
 * The stylesheet task focuses on gathering all the scss files from the views,
 * compile them into css, and create a bundle.
 */

var config = require('../configs/lemon');

var gulp = require('gulp');
var rename = require('gulp-rename');
var concatenate = require('gulp-concat');
var compass = require('gulp-compass');


var files = [
    config.views + '.scss'
];


/**
 * Stylesheet bundle
 *
 * The views are written in Sass and use some of the libraries from compass.
 * It generates first a concatenated file of all the views, and then process
 * the code into browser-friendly css.
 */
gulp.task('stylesheet:bundle', ['linter:scss'], function() {
    return gulp.src(files)
        .pipe(concatenate(config.appBundleName + '.scss'))
        .pipe(config.dest())
        .pipe(compass({
            sass: config.staticDir,
            css: config.staticDir,
            style: 'compressed',
            time: true
        }))
        .pipe(config.dest());
});



/**
 * Watcher for the stylesheet files.
 *
 * Any changes done to our stylesheets will refresh the stylesheet bundle
 * automatically.
 */
gulp.task('stylesheet:watch', function() {
    gulp.watch(files, ['stylesheet:bundle']);
});
