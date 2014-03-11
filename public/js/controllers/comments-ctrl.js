app.controller('commentsCtrl', function ($scope, models, $location, dialogService) {

    var commentModel = models.comment;
    $scope.sort = 'vote_count.positive';
    $scope.owner = $location.search().owner;
    $scope.root = $location.search().root;


    if ($scope.root) {
        $scope.commentsLQ = commentModel.liveQuery().find({root: $scope.root, reply_on: null}).sort('-vote_count.karma')
            .populate('owner', 'fb.username fb.picture.data.url').exec();
        models.novel.query().findOne({_id: $scope.root}).exec().then(function (n) {
            $scope.novel = n;
        });

    } else if($scope.owner) {
        $scope.commentsLQ = commentModel.liveQuery().find({owner: $scope.owner, reply_on: null}).sort('-vote_count.karma')
            .populate('owner', 'fb.username fb.picture.data.url').exec();
        models.user.query().findOne({_id: $scope.owner}).exec().then(function (user) {
            $scope.user = user;
        });
    }

    if ($scope.commentsLQ) {
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
        };

    }

});