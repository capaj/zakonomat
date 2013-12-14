//expects this kind of query:
//  liveQuery().populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();

angular.module('zakonomat').directive('znVote', function (MRBackend) {
	return {
		replace: false,
		restrict: 'E',
		templateUrl: '/templates/directives/zn_vote.html',
		scope: {
			vote: '='
		},
		link: function (scope, el, attr) {
			MRBackend.getModel('novelVote').then(function (voteModel) {
				scope.ready = true;
				scope.remove = function () {
					voteModel.remove(scope.vote);
				}
			});

		}
	}
});