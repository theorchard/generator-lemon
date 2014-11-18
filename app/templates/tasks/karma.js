/**
 * Configuration file for the karma tests.
 *
 * Karma runs tests on all the views and libraries, and it additionally
 * provides coverage information.
 */

var config = require('../configs/lemon');

var fs = require('fs');
var glob = require('glob');
var lemon = require('lemon');


var closurePath = lemon.bower + 'closurelibrary/closure/goog/';
var tests = 'tests/**/*.js';
var files = [
    'configs/tests.js',

    // closure base
    closurePath + 'base.js',

    // Additional dependencies.
    lemon.bower + 'jquery/index.js',
    lemon.bower + 'underscore/index.js',
    lemon.bower + 'backbone/index.js',
];


// Creating the preprocessors.
var preprocessors = {};
preprocessors[lemon.tests] = ['closure'];
preprocessors[config.viewsJs] = ['closure'];
preprocessors[config.viewController] = ['closure', 'coverage'];
preprocessors[config.libs] = ['closure', 'coverage'];
preprocessors[closurePath + 'base.js'] = ['closure-deps'];
preprocessors[config.tests] = ['closure'];


// Convert all the yml files into js files that can be used within the tests.
glob.sync(config.viewsDescriptions).forEach(function(file) {
    var filepath = lemon.utils.convertYml(file, 'build/tests/');
    if (filepath) {
        files.push({pattern: filepath, included: false});
        preprocessors[filepath] = ['closure'];
    }
});


glob.sync(config.viewsTemplates).forEach(function(file) {
    files.push({pattern: file, included: false, served: true});
});


lemon.files.forEach(function(file) {
    files.push({pattern: file, included: false});
    preprocessors[file] = ['closure'];
});


var karmaConfig = {
    basePath: '../',
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'closure', 'sinon-chai', 'nunjucks'],

    files: files.concat([
        // included files - tests.
        {pattern: lemon.tests, included: false},

        // Application tests.
        config.tests,
        config.viewsTests,

        // source files - these are only watched and served
        {pattern: config.libs, included: false},
        {pattern: config.viewsJs, included: false},

        // external deps
        {pattern: closurePath + 'deps.js', included: false, served: false}
    ]),

    preprocessors: preprocessors,

    reporters: [
        'mocha',
        'coverage',
        'junit'],

    junitReporter: {
        outputFile: 'build/jsunit.xml',
        suite: ''
    },

    // Add coverage
    coverageReporter: {
        type : 'cobertura',
        file: 'jscoverage.xml',
        dir: 'build/',
        subdir: '.'
    }
};

module.exports = function(config) {
    config.set(karmaConfig);
};
