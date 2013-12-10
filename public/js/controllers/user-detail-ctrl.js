app.controller('userDetailCtrl', function ($scope, $location) {
    var userLQ = $scope.MR.user.liveQuery;
    var aLQ;
	if ($location.search().username) {
        aLQ = userLQ().where('fb.username').equals($location.search().username).exec();
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


	$scope.user = function () {
		if (!aLQ.docs) {
			return '';
		}
		return aLQ.docs[0];
    };


});