app.controller('novelDetailCtrl', function ($scope, $location, dialogService) {
	var novelLQ = $scope.MR.novel.liveQuery;
	var commentModel = $scope.MR.comment;
	$scope.sort = 'vote_count.positive';
	var id = $location.search()._id;
	if (id) {
		$scope.LQ = novelLQ().findOne({_id: id}).exec();
        $scope.LQ.promise.then(function (LQ) {
            if (!angular.isObject(LQ.doc)) {
                $scope.nonexistentNovelId = id;
            } else {
                $scope.commentsLQ = commentModel.liveQuery().find({root: id, reply_on: null}).sort('-vote_count.karma')
                    .populate('owner', 'fb.username fb.picture.data.url').exec();

                $scope.showNewCommentInput = function () {
                    $scope.newComment = {};
                };

                $scope.createComment = function () {
                    $scope.newComment.root = id;
                    commentModel.create($scope.newComment).then(function () {
                        $scope.newComment = null;
                    });
                };
                $scope.cancelComment = function () {
                    $scope.newComment = null;
                }
            }
        });


	}

});