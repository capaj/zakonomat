//expects this kind of query:
//  liveQuery().populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();

angular.module('zakonomat').directive('znNovel', function (MRBackend) {
	return {
		replace: false,
		restrict: 'E',
		templateUrl: '/templates/directives/zn_novel.html',
		scope:{
			novel: '='
		},
		link: function (scope, el, attr) {
			MRBackend.getModel('novelVote').then(function (model) {

				scope.voteOnNovel = function (novel, how) {
					model.create({subject: scope.novel._id, value: how});
				};
			})
		}
	}
});