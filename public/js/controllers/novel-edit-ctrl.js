app.controller('novelEditCtrl', function ($scope, $location) {
	$scope.novel = {};
	$scope.create = function () {
		$scope.MR.novel.create($scope.novel).then(function () {
			$location.path('/navrhy');
		});
	};


});