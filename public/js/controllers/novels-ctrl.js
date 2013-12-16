app.controller('novelsCtrl', function ($scope, $location) {
    var novelsLQ = $scope.MR.novel.liveQuery;
	$scope.sort = 'vote_count.positive';

	$scope.LQ = novelsLQ().populate('owner','fb.username').exec();
	$scope.ncLQ = novelsLQ().count().exec();
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });

});