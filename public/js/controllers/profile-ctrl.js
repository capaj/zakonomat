app.controller('profileCtrl', function ($scope, userService, $log) {
    var uliveQuery = $scope.MR.user.liveQuery;
    var vliveQuery = $scope.MR.novelVote.liveQuery;

    userService.loginPromise.then(function (me) {
        $scope.uLQ = uliveQuery({where: 'fb.id', equals: me.id});
        $scope.uLQ.promise.then(function (LQ) {

            $scope.profile = function () {
                return LQ.docs[0];
            };
            $scope.voteCountLQ = vliveQuery({find: {owner: $scope.profile()._id}, count:true});
            $scope.positiveVoteCountLQ = vliveQuery({find: {owner: $scope.profile()._id, value:true}, count: true});
            $scope.negativeVoteCountLQ = vliveQuery({find: {owner: $scope.profile()._id, value:false}, count: true});

            $scope.getFullName = function () {
                return $scope.profile().fb.first_name + ' ' + $scope.profile().fb.last_name;
            };
            $scope.vsLQ = vliveQuery({where: 'owner', equals: $scope.profile()._id});
        });



    }, function (err) {
        $log.error(err);
    });


	$scope.logout = userService.logout;

});