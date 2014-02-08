app.controller('novelEditCtrl', function ($scope, $location, gistService) {
	$scope.novel = {};

    var onFail = function (err) {
        $scope.lastError = err;
    };

    $scope.create = function () {

        $scope.clearErr();

        $scope.MR.novel.create($scope.novel).then(function () {
            $location.path('/navrhy');
        }, onFail);


	};

    $scope.clearErr = function () {
        $scope.lastError = '';

    };

    $scope.cancel = function () {
        $location.path('/navrhy');
    };

    $scope.$watch('novel.gist_id', function (nV) {
        if (nV) {
            gistService.getGist(nV).then(function (gist) {
                $scope.novelContent = gist.files[Object.keys(gist.files)[0]].content;
                $scope.gistDescription = gist.description;

            }, onFail);
        }
    });

});