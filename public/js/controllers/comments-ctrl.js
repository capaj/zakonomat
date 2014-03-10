app.controller('commentsCtrl', function ($scope, models, $location, dialogService) {

    var commentModel = models.comment;
    $scope.sort = 'vote_count.positive';
    var root = $location.search().root;
    if (root) {
        $scope.commentsLQ = commentModel.liveQuery().find({root: root, reply_on: null}).sort('-vote_count.karma')
            .populate('owner', 'fb.username fb.picture.data.url').exec();

        $scope.showNewCommentInput = function () {
            $scope.newComment = {};
        };

        $scope.createComment = function () {
            $scope.newComment.root = root;
            commentModel.create($scope.newComment).then(function () {
                $scope.newComment = null;
            });
        };
        $scope.cancelComment = function () {
            $scope.newComment = null;
        }

    }

});