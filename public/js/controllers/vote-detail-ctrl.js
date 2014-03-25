app.controller('voteDetailCtrl', function ($scope, $location, novelVote) {
	var voteLQ = novelVote.liveQuery;
	var id = $location.search()._id;
	if (id) {
		$scope.LQ = voteLQ().where('_id').equals(id).populate('subject', 'title').populate('owner', 'fb.username fb.id').exec();
	}

});