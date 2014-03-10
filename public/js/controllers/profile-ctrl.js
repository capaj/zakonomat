app.controller('profileCtrl', function ($scope, models, userService, $log) {
    var userLQ = models.user.liveQuery;
    var voteLQ = models.novelVote.liveQuery;

    userService.loginPromise.then(function (me) {

        $scope.profile = me;
        $scope.voteCountLQ = voteLQ().find({owner: me._id}).count().exec();
        $scope.positiveVoteCountLQ = voteLQ().find({owner: me._id, value: true}).count().exec();
        $scope.negativeVoteCountLQ = voteLQ().find({owner: me._id, value: false}).count().exec();

        $scope.getFullName = function () {
            return me.fb.first_name + ' ' + me.fb.last_name;
        };
        $scope.votesLQ = voteLQ().where('owner').equals(me._id).populate('subject', 'title').exec();

    }, function (err) {
        $log.error(err);
    });
    $scope.dirty = false;

    $scope.markDirty = function () {
        $scope.dirty = true;
    };
    $scope.$on("$locationChangeStart", function (event, next, current) {
        if ($scope.dirty) {
            models.user.update($scope.profile).then(function () {
                console.log("Profile updated");
            });
        }

    });

    $scope.logout = userService.logout;

    //TODO add method to delete an account for good
});