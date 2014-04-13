window.app = angular.module('zakonomat',
    [
        'ngRoute',
        'ngAnimate',
        'ngTouch',
        'angularMoment',
        'angularLocalStorage',
        'ngSanitize',
        'mgcrea.ngStrap',
        'RPC',
        'ngTemplates',
        'ngTools',
        'Moonridge',
        'nvd3ChartDirectives',
        'ui.bootstrap.progressbar',
        'ui.bootstrap.pagination',
        'angulartics', 'angulartics.google.analytics'
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
).run(
    function ($rootScope) {
        $rootScope.formatDate = function (dt) {
            return moment(dt).format('LL');
        };

	}
);

