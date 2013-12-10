app.controller('novelsCtrl', function ($scope, $location) {
    var nliveQuery = $scope.MR.novel.liveQuery;
	$scope.sort = 'vote_count.positive';

	$scope.LQ = nliveQuery().exec();
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });


    $scope.getter = function () {
        return LQ.docs[0];
    };

    $scope.voteOnNovel = function (novel, how) {
        $scope.MR.novelVote.create({subject: novel._id, value: how});
    };



});