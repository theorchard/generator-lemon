/**
 * Configuration file for the karma tests.
 *
 * Karma runs tests on all the views and libraries, and it additionally
 * provides coverage information.
 */

var lemon = require('lemon');

var rootPath = '../';
var closurePath = lemon.bower + 'closurelibrary/closure/goog/';
var libs = rootPath + '<%= package.appName %>/libs/*.js';
var views = rootPath + '<%= package.appName %>/<%= package.viewPath %>/**/*.js';
var coverage = rootPath + '<%= package.appName %>/<%= package.viewPath %>/**/!(*tests).js';
var tests = rootPath + 'tests/**/*.js';
var testViews = rootPath + '<%= package.appName %>/<%= package.viewPath %>/**/*.tests.js';
var preprocessors = {};


var files = [
    // closure base
    closurePath + 'base.js',

    // Additional dependencies.
    lemon.bower + 'jquery/index.js',
    lemon.bower + 'underscore/index.js',
    lemon.bower + 'backbone/index.js',
];


// Preprocessing some of the data (dependencies mostly.)
preprocessors[tests] = ['closure'];
preprocessors[libs] = ['closure', 'coverage'];
preprocessors[views] = ['closure'];
preprocessors[coverage] = ['closure', 'coverage'];
preprocessors[closurePath + 'base.js'] = ['closure-deps'];

lemon.files.forEach(function(file) {
    files.push({pattern: file, included: false});
    preprocessors[file] = ['closure'];
});


var karmaConfig = {
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'closure', 'sinon-chai'],

    files: files.concat([
        // included files - tests
        tests,
        testViews,

        // source files - these are only watched and served
        {pattern: libs, included: false},
        {pattern: views, included: false},

        // external deps
        {pattern: closurePath + 'deps.js', included: false, served: false}
    ]),

    preprocessors: preprocessors,

    reporters: [
        'mocha',
        'coverage',
        'junit'],

    junitReporter: {
        outputFile: '../build/jsunit.xml',
        suite: ''
    },

    // Add coverage
    coverageReporter: {
        type : 'cobertura',
        file: 'jscoverage.xml',
        dir: '../build/',
        subdir: '.'
    }
};

module.exports = function(config) {
    config.set(karmaConfig);
};
