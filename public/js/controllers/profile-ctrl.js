app.controller('profileCtrl', function ($scope, userService) {
    var uliveQuery = $scope.MR.user.liveQuery;
    var vliveQuery = $scope.MR.novelVote.liveQuery;

    userService.loginPromise.then(function (me) {
        $scope.uLQ = uliveQuery({where: 'fb.id', equals: me.id});
        $scope.uLQ.promise.then(function (LQ) {

            $scope.profile = function () {
                return LQ.docs[0];
            };
            $scope.getFullName = function () {
                return $scope.profile().fb.first_name + ' ' + $scope.profile().fb.last_name;
            };
            $scope.vsLQ = vliveQuery({where: 'owner', equals: LQ.docs[0]._id});
        });
    });


	$scope.logout = userService.logout;

});