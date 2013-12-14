//expects this kind of query:
//  liveQuery().populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();

angular.module('zakonomat').directive('znNovel', function (MRBackend, userService) {
	return {
		replace: false,
		restrict: 'E',
		templateUrl: '/templates/directives/zn_novel.html',
		scope: {
			novel: '='
		},
		link: function (scope, el, attr) {
			MRBackend.getModel('novelVote').then(function (voteModel) {

				scope.voteOnNovel = function (novel, how) {
					voteModel.create({subject: scope.novel._id, value: how});
				};
				//current vote LQ

				scope.$watch('novel', function (nV, oV) {
					if (nV) {
						if (scope.currentVoteLQ) {
							scope.currentVoteLQ.stop();
						}
						var currUserCiteria = {subject: scope.novel._id, owner: userService.profile._id};
						scope.currentVoteLQ = voteModel.liveQuery().findOne(currUserCiteria).populate('subject', 'title').exec();

					}
				});

				scope.votesSum = function () {
					if (!scope.novel) {
						return 0;
					}
					return scope.novel.vote_count.positive + scope.novel.vote_count.negative;
				}
			});
		}
	}
});