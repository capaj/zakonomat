app.controller('novelEditCtrl', function ($scope, $location, gistService) {
	$scope.novel = {};

    var onFail = function (err) {
        $scope.lastError = err;
    };

    $scope.create = function () {
        if ($scope.novel.summary.length >= 500) {
            $scope.lastError = 'Krátký popis nesmí přesáhnout 500 znaků.';
        } else {
            $scope.clearErr();

            $scope.MR.novel.create($scope.novel).then(function () {
                $location.path('/navrhy');
            }, onFail);
        }

	};

    $scope.clearErr = function () {
        $scope.lastError = '';

    };

    $scope.cancel = function () {
        $location.path('/navrhy');
    };

    $scope.$watch('novel.gist_id', function (nV) {
        if (nV) {
            gistService.getFirstFileContent(nV).then(function (content) {
                $scope.novelContent = content;
            }, onFail);
        }
    });

});