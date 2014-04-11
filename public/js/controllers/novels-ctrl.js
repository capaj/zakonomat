app.controller('novelsCtrl', function ($scope, models, userService) {
    var novelsLQ = models.novel.liveQuery;
    var votesLQ = models.novelVote.liveQuery;
	$scope.sort = 'vote_count.positive';

    $scope.filterOutVoted = true;
    $scope.votesDifference = function (novel) {
        if (!novel) {
            return 0;
        }
        return novel.vote_count.positive - novel.vote_count.negative;
    };

    userService.loginPromise.then(function (profile) {
        if (profile.privilige_level >= 10) {
            $scope.canCreateNovels = true;
        }
        $scope.ncLQ = novelsLQ().count().exec();


        var runNovelQuery = function () {
            var exclude = [];

            if (usersVotes.docs) {
                var index = usersVotes.docs.length;
                while(index--) {
                    exclude.push(usersVotes.docs[index].subject);
                }
            }
            if ($scope.LQ) {
                $scope.LQ.stop();
            }


            if ($scope.filterOutVoted) {
                usersVotes.on('create', runNovelQuery);
                usersVotes.on('remove', runNovelQuery);
                $scope.LQ = novelsLQ().limit(20).where('_id').nin(exclude).exec();

            } else {
                $scope.LQ = novelsLQ().limit(20).exec();

            }
        };

        var usersVotes = votesLQ().find({owner: profile._id}).select('_id subject').exec();

        usersVotes.promise.then(function () {
            runNovelQuery();
        });

    });


});