angular.module('zakonomat').directive('znUser', function (MRBackend) {
    var formatDate = function (dt) {
        return moment(dt).format('LL');
    };
    return {
		replace: false,
		restrict: 'E',
		templateUrl: '/templates/directives/zn_user.html',
		scope: {
			user: '='
		},
		link: function (scope, el, attr) {
			MRBackend.getModels(['novelVote', 'comment']).then(function (models) {
                var voteLQ = models.novelVote.liveQuery;
                var userId = scope.user._id;
                scope.voteCountLQ = voteLQ().find({owner: userId}).count().exec();
                scope.positiveVoteCountLQ = voteLQ().find({owner: userId, value: true}).count().exec();
                scope.negativeVoteCountLQ = voteLQ().find({owner: userId, value: false}).count().exec();

                var commentLQ = models.comment.liveQuery;
                scope.commentCountLQ = commentLQ().find({owner: userId}).count().exec();
			});

            scope.$watch('user.creation_date', function (newValue) {
                if (newValue) {
                    scope.registeredDate = formatDate(newValue);
                }
            });


		}
	}
});