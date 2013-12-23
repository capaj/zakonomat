app.controller('votesCtrl', function ($scope, $location) {
    var nVLQ = $scope.MR.novelVote.liveQuery;
    var nLQ = $scope.MR.novel.liveQuery;
    var search = $location.search();

    function votesQueryC() {
        return nVLQ().find(search).sort('-creation_date').populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url');
    }

    $scope.votesLQ = votesQueryC().exec();
	$scope.voteCountLQ = nVLQ().find(search).count().exec();


    if (search.subject) {
        $scope.subjectLQ = nLQ().findOne().where('_id').equals(search.subject).exec();
    }

    $scope.$on('$routeUpdate', function(){
        search = $location.search();

        $scope.votesLQ = votesQueryC().exec();
        $scope.voteCountLQ = nVLQ().find(search).count().exec();

        if (search.subject) {
            $scope.subjectLQ = nLQ().findOne().where('_id').equals(search.subject).exec();
        } else {
            $scope.subjectLQ = null;
        }
    });



});