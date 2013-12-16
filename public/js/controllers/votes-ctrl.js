app.controller('votesCtrl', function ($scope, $location) {
    var nVLQ = $scope.MR.novelVote.liveQuery;
    var nLQ = $scope.MR.novel.liveQuery;
    var search = $location.search();

    $scope.LQ = nVLQ().find(search).populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();
	$scope.votesLQ = nVLQ().find(search).count().exec();


    if (search.subject) {
        $scope.subjectLQ = nLQ().findOne().where('_id').equals(search.subject).exec();
    }

    $scope.$on('$routeUpdate', function(){
        var search = $location.search();

        $scope.LQ = nVLQ().find(search).populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();
        $scope.votesLQ = nVLQ().find(search).count().exec();

        if (search.subject) {
            $scope.subjectLQ = nLQ().findOne().where('_id').equals(search.subject).exec();
        } else {
            $scope.subjectLQ = null;
        }
    });



});