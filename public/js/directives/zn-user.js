angular.module('zakonomat').directive('znUser', function (MRBackend) {
	return {
		replace: false,
		restrict: 'E',
		templateUrl: '/templates/directives/zn_user.html',
		scope: {
			user: '='
		},
		link: function (scope, el, attr) {
			MRBackend.getModel('novelVote').then(function (voteModel) {
                var voteLQ = voteModel.liveQuery;
                var userId = scope.user._id;
                scope.voteCountLQ = voteLQ().find({owner: userId}).count().exec();
                scope.positiveVoteCountLQ = voteLQ().find({owner: userId, value: true}).count().exec();
                scope.negativeVoteCountLQ = voteLQ().find({owner: userId, value: false}).count().exec();
			});

			scope.formatDate = function (dt) {
				return moment(dt).format('LL');
			}

		}
	}
});