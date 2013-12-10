app.controller('profileCtrl', function ($scope, userService, $log) {
    var uliveQuery = $scope.MR.user.liveQuery;
    var vliveQuery = $scope.MR.novelVote.liveQuery;

    userService.loginPromise.then(function (me) {
        $scope.uLQ = uliveQuery().where('fb.id').equals(me.id).exec();
        $scope.uLQ.promise.then(function (LQ) {

            $scope.profile = function () {
                return LQ.docs[0];
            };
            $scope.voteCountLQ = vliveQuery().find({owner: $scope.profile()._id}).count().exec();
            $scope.positiveVoteCountLQ = vliveQuery().find({owner: $scope.profile()._id, value: true}).count().exec();
            $scope.negativeVoteCountLQ = vliveQuery().find({owner: $scope.profile()._id, value: false}).count().exec();

            $scope.getFullName = function () {
                return $scope.profile().fb.first_name + ' ' + $scope.profile().fb.last_name;
            };
            $scope.votesLQ = vliveQuery().where('owner').equals($scope.profile()._id);
        });



    }, function (err) {
        $log.error(err);
    });


	$scope.logout = userService.logout;

});