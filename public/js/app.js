window.app = angular.module('zakonomat',
    [
        'ngRoute',
        'ngTouch',
        'angularMoment',
        'angularLocalStorage',
        'analytics',
		'ngSanitize',
        'RPC',
        'textAngular',
        'ngTemplates',
        'ng-tools',
		'Moonridge',
        'nvd3ChartDirectives'
        // included, but by default not loaded, if you need it, just add it to script manifest
        // 'angular-gestures'
    ]
).config(
    function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);  //Setting HTML5 Location Mode
		moment.lang('cs');  //czech language
        routesModule.routes.forEach(function(routeDef){
            $routeProvider.when(routeDef.route, routeDef.resolve);
        });
        $routeProvider.otherwise({redirectTo:'/404'});
    }
).run(function ($MR, facebook, $q, $location, storage) {


	});