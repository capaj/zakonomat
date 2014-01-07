var bc = 'public/lib/';
var moduleFile = 'public/js/app.js';

var appFiles = [
    bc + '**/angular-animate.js',
    'public/js/routes.js',
    //animations
    'public/js/bootstrap/tooltip.js',
    'public/js/bootstrap/*.js',
    //animations
    'public/js/animations/*.js',
    //directives
    'public/js/directives/*.js',
    //FACTORY
    'public/js/factories/*.js',
    //Services
    'public/js/services/*.js',
	//FILTERS
	'public/js/filters/*.js',
    /// CONTROLLERS
    'public/js/controllers/*.js',
    '!public/js/**/_*.*'
];

var forConcat = appFiles.slice(0);
forConcat.unshift(moduleFile);

var productionFiles = {
    1: [
		'public/js/preload/*.min.js',
		bc + 'array-sugar/array-sugar.js',
        bc + '**/d3.js',
        bc + '**/moment.min.js', bc + '**/jquery.min.js'
	],
    2: [
        bc + 'angular/angular.min.js',
        bc + '**/nv.d3.min.js'
    ],
    3: [
        bc + '**/angularjs-nvd3-directives.js',
        bc + '**/ng-tools.min.js',
        bc + '**/angular-animate.min.js',
        'public/js/angular/angular-sanitize.min.js',
        'public/js/angular-bootstrap/pagination.min.js',
        bc + '**/angular-touch.min.js',
        bc + '**/textAngular.min.js',
		bc + '**/lang/cs.js',
		bc + '**/angular-moment.min.js',
        bc + '**/angularLocalStorage.min.js',
        bc + '**/ng-tools-0.0.3.min.js',
        bc + '**/angular-route.min.js',
        'public/built/<%= pkg.name %>-templates-<%= pkg.version %>.js'
    ],
    4: ['public/built/<%= pkg.name %>-<%= pkg.version %>.min.js']
};

var devFiles = {
    1: [
		'public/js/preload/*.js',
		bc + 'array-sugar/array-sugar.js',
        bc + '**/d3.min.js',
        bc + '**/moment.js', bc + '**/jquery.min.js'
	],
    2: [
        bc + 'angular/angular.js',
        bc + '**/nv.d3.js'
    ],
    3: [
        bc + '**/angularjs-nvd3-directives.js',
        bc + '**/ng-tools.js',
        'public/js/angular/angular-sanitize.js',
        'public/js/angular-bootstrap/pagination.js',
        bc + '**/textAngular.js',
		bc + '**/angular-touch.js',
		bc + '**/lang/cs.js',
		bc + '**/angular-moment.js',
        bc + '**/angularLocalStorage.js',
        bc + '**/ng-tools-0.0.3.min.js',
        bc + '**/angular-route.js',
        'public/js/bootstrap/tooltip.js',
        moduleFile,
        'public/built/<%= pkg.name %>-templates-<%= pkg.version %>.js'
    ],
    4:  appFiles //all the concatenated files loaded asynchronously
};

if (module.exports) {
    module.exports = {
        concat: forConcat,
        dev: devFiles,
        production: productionFiles
    };
}
