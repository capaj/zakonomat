app.controller('userDetailCtrl', function ($scope, $location) {
    var userLQ = $scope.MR.user.liveQuery;
    var voteLQ = $scope.MR.novelVote.liveQuery;
    var aLQ;
	$scope.user = function() {
		if (!aLQ.docs) {
			return '';
		}
		return aLQ.docs[0];
	};
	var getUser = $scope.user;
	if ($location.search().username) {
        aLQ = userLQ().where('fb.username').equals($location.search().username).exec();
		$scope.votesLQ = voteLQ().where('owner').equals(getUser()._id).populate('subject', 'title').exec();

	}
	aLQ.promise.then(function (LQ) {
        console.log(LQ);

    });


    $scope.$watch('findByName', function (nV, oV) {
		if (nV) {
			$location.search('username', nV);
//			$scope.LQ._query.equals = nV;
		}

    });

	$scope.deleteCurrentQuery = function () {
		aLQ.stop();
		delete aLQ.docs;
	};





});