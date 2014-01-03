app.controller('novelsCtrl', function ($scope, $location) {
    var novelsLQ = $scope.MR.novel.liveQuery;
	$scope.sort = 'vote_count.positive';

	$scope.LQ = novelsLQ().limit(20).exec();
	$scope.ncLQ = novelsLQ().count().exec();
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });

    $scope.votesDifference = function (novel) {
        if (!novel) {
            return 0;
        }
        return novel.vote_count.positive - novel.vote_count.negative;
    };

});