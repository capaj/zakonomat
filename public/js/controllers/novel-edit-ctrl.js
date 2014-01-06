app.controller('novelEditCtrl', function ($scope, $location) {
	$scope.novel = {};
	$scope.create = function () {
        if ($scope.novel.summary.length >= 500) {
            $scope.lastError = 'Krátký popis nesmí přesáhnout 500 znaků.';
        } else {
            $scope.clearErr();
            $scope.MR.novel.create($scope.novel).then(function () {
                $location.path('/navrhy');
            }, function (err) {
                $scope.lastError = err;
            });
        }

	};

    $scope.clearErr = function () {
        $scope.lastError = '';

    };

    $scope.cancel = function () {
        $location.path('/navrhy');
    };



});