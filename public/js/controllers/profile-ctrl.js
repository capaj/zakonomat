app.controller('profileCtrl', function ($scope, userService, $log) {
    var userLQ = $scope.MR.user.liveQuery;
    var voteLQ = $scope.MR.novelVote.liveQuery;

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
            $scope.MR.user.update($scope.profile).then(function () {
                console.log("Profile updated");
            });
        }

    });

    $scope.logout = userService.logout;

    //TODO add method to delete an account for good
});