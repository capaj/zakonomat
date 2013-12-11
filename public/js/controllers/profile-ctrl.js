app.controller('profileCtrl', function ($scope, userService, $log) {
    var userLQ = $scope.MR.user.liveQuery;
    var voteLQ = $scope.MR.novelVote.liveQuery;

    userService.loginPromise.then(function (me) {
        $scope.uLQ = userLQ().where('fb.id').equals(me.id).exec();
        $scope.uLQ.promise.then(function (LQ) {

            $scope.profile = function () {
                return LQ.docs[0];
            };
            $scope.voteCountLQ = voteLQ().find({owner: $scope.profile()._id}).count().exec();
            $scope.positiveVoteCountLQ = voteLQ().find({owner: $scope.profile()._id, value: true}).count().exec();
            $scope.negativeVoteCountLQ = voteLQ().find({owner: $scope.profile()._id, value: false}).count().exec();

            $scope.getFullName = function () {
                return $scope.profile().fb.first_name + ' ' + $scope.profile().fb.last_name;
            };
            $scope.votesLQ = voteLQ().where('owner').equals($scope.profile()._id).exec();
        });



    }, function (err) {
        $log.error(err);
    });


	$scope.logout = userService.logout;

});