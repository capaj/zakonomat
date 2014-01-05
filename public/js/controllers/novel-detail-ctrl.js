app.controller('novelDetailCtrl', function ($scope, $location, dialogService) {
	var novelLQ = $scope.MR.novel.liveQuery;
	$scope.sort = 'vote_count.positive';
	var id = $location.search()._id;
	if (id) {
		$scope.LQ = novelLQ().findOne({_id: id}).exec();
        $scope.LQ.promise.then(function (LQ) {
            if (!angular.isObject(LQ.doc)) {
                $scope.nonexistentNovelId = id;
            }
        });

	}

});