app.controller('voteDetailCtrl', function ($scope, $location) {
	var voteLQ = $scope.MR.novelVote.liveQuery;
	var id = $location.search()._id;
	if (id) {
		$scope.LQ = voteLQ().where('_id').equals(id).populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();
	}

});