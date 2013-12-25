app.controller('profileCtrl', function ($scope, userService, $log) {
    var userLQ = $scope.MR.user.liveQuery;
    var voteLQ = $scope.MR.novelVote.liveQuery;

    userService.loginPromise.then(function (me) {
        $scope.uLQ = userLQ().findOne().where('fb.id').equals(me.fb.id).exec();
        $scope.uLQ.promise.then(function (LQ) {

            $scope.profile = function() {
                return LQ.doc;
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
    $scope.dirty = false;

    $scope.markDirty = function () {
        $scope.dirty = true;
    };
    $scope.$on("$locationChangeStart", function (event, next, current) {
        if ($scope.dirty) {
            $scope.MR.user.update($scope.uLQ.doc).then(function () {
                console.log("Profile updated");
            });
        }

    });

    $scope.logout = userService.logout;


});