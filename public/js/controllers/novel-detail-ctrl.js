app.controller('novelDetailCtrl', function ($scope, $location, dialogService) {
	var novelLQ = $scope.MR.novel.liveQuery;
	$scope.sort = 'vote_count.positive';
	var id = $location.search()._id;
	if (id) {
		$scope.LQ = novelLQ().find({_id: id}).exec();
	}

});