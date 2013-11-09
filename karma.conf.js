// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html
require('array-sugar');
var sManifest = require('./public/script-manifest.js').dev;
var testFiles = [];
for(var i in sManifest){
	testFiles.insert(testFiles.length-1, sManifest[i]);
}
testFiles = testFiles.concat([
	'public/built/ng-templates.js',
	'public/lib/angular-mocks/angular-mocks.js',
	'test/unit/**/*.js'
]);
console.dir(testFiles);	//shows loaded files, good for checking whether your blob expressions are proper
module.exports = function(config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: testFiles,

		// list of files / patterns to exclude
		exclude: [],

		// web server port
		port: 8066,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],
//    browsers: ['Chrome','Safari','Firefox','Opera','ChromeCanary'],

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};
