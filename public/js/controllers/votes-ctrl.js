app.controller('votesCtrl', function ($scope, $location) {
    var liveQuery = $scope.MR.liveQuery;
    var search = $location.search();

    $scope.LQ = liveQuery().find(search).populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();
	$scope.votesLQ = liveQuery().count().exec();

////        1: {populate:['subject', 'title'], applyArgs: true}
////        2: {populate:['owner', 'fb', 'username'], applyArgs: true}

    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });



});