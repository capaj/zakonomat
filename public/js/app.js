window.app = angular.module('zakonomat',
    [
        'ngRoute',
        'ngTouch',
        'angularMoment',
        'angularLocalStorage',
        'analytics',
        'RPC',
		'Moonridge'
        // included, but by default not loaded, if you need it, just add it to script manifest
        // 'angular-gestures'
    ]
).config(
    function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);  //Setting HTML5 Location Mode

        routesModule.routes.forEach(function(routeDef){
            $routeProvider.when(routeDef.route, routeDef.resolve);
        });
        $routeProvider.otherwise({redirectTo:'/404'});
    }
).run(function ($MR, facebook, $q) {
		var dfd = $q.defer();
		facebook.onLogin.register(function () {

			dfd.resolve({url: 'http://localhost:8080', hs: { query: "aToken=" + facebook.aToken } } );
		});
		$MR('local', dfd.promise);

	});