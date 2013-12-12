app.controller('profileCtrl', function ($scope, userService, $log) {
    var userLQ = $scope.MR.user.liveQuery;
    var voteLQ = $scope.MR.novelVote.liveQuery;

    userService.loginPromise.then(function (me) {
        $scope.uLQ = userLQ().where('fb.id').equals(me.id).exec();
        $scope.uLQ.promise.then(function (LQ) {

            $scope.profile = function() {
                return LQ.docs[0];
            };
			var getProfile = $scope.profile;
            $scope.voteCountLQ = voteLQ().find({owner: getProfile()._id}).count().exec();
            $scope.positiveVoteCountLQ = voteLQ().find({owner: getProfile()._id, value: true}).count().exec();
            $scope.negativeVoteCountLQ = voteLQ().find({owner: getProfile()._id, value: false}).count().exec();

            $scope.getFullName = function () {
                return getProfile().fb.first_name + ' ' + getProfile().fb.last_name;
            };
            $scope.votesLQ = voteLQ().where('owner').equals(getProfile()._id).populate('subject', 'title').exec();

		});



    }, function (err) {
        $log.error(err);
    });


	$scope.logout = userService.logout;

});