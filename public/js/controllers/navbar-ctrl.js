app.controller('navbarCtrl', function ($scope, userService, facebook) {
    $scope.userService = userService;
	$scope.fbLogin = function () {
		facebook.login();
	};
	
});