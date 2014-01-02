app.controller('novelsCtrl', function ($scope, $location) {
    var novelsLQ = $scope.MR.novel.liveQuery;
	$scope.sort = 'vote_count.positive';

	$scope.LQ = novelsLQ().populate('owner','fb.username fb.picture.data.url').exec();
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

    //TODO make this into a directive
    var width = document.body.clientWidth;
    if (width < 1500) {
        $scope.sideW = 1;
        $scope.contentW = 10;
        return;
    } else if(width < 2300) {
        $scope.sideW = 2;
        $scope.contentW = 8;
    } else {
        $scope.sideW = 3;
        $scope.contentW = 6;
    }


});