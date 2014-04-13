var bc = 'public/lib/';
var moduleFile = 'public/js/app.js';

var appFiles = [
    bc + '**/angulartics.js',
    bc + '**/angulartics-ga.js',
    bc + '**/angular-animate.js',
    'public/lib/moonridge-angular-client-rpcbundle-annotated.js',
    bc + 'angular-strap/dist/angular-strap.tpl.js',
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

var forConcat = appFiles.slice(0);  //copying
forConcat.unshift(moduleFile);  // insert at the top

var productionFiles = {
    1: [
		'public/js/preload/*.min.js',
		bc + 'array-sugar/array-sugar.js',
        bc + '**/d3.js',
        bc + '**/moment.min.js',
        bc + '**/jquery.min.js',
        bc + 'showdown/compressed/showdown.js'
	],
    2: [
        bc + 'angular/angular.min.js',
        bc + '**/nv.d3.min.js'
    ],
    3: [
        bc + '**/angular-moment.min.js',
        bc + 'angular-strap/dist/angular-strap.min.js',
        bc + 'angular-strap/dist/angular-strap.tpl.min.js',
        bc + '**/angularjs-nvd3-directives.js',
        bc + '**/ng-tools.min.js',
        'public/js/angular/angular-sanitize.min.js',
        'public/js/angular-bootstrap/progressbar.min.js',
        'public/js/angular-bootstrap/pagination.min.js',
        bc + '**/angular-touch.min.js',
		bc + '**/lang/cs.js',
        bc + '**/angularLocalStorage.min.js',
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
        bc + '**/moment.js', bc + '**/jquery.min.js',
        bc + 'showdown/compressed/showdown.js'
    ],
    2: [
        bc + 'angular/angular.js',
        bc + '**/nv.d3.js'
    ],
    3: [
        bc + '**/angular-moment.js',
        bc + 'angular-strap/dist/angular-strap.js',
        bc + '**/angularjs-nvd3-directives.js',
        bc + '**/ng-tools.js',
        'public/js/angular/angular-sanitize.js',
        'public/js/angular-bootstrap/pagination.js',
        'public/js/angular-bootstrap/progressbar.js',
		bc + '**/angular-touch.js',
		bc + '**/lang/cs.js',
        bc + '**/angularLocalStorage.js',
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
        development: devFiles,
        production: productionFiles
    };
}
