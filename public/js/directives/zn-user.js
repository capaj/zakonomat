angular.module('zakonomat').directive('znUser', function (MRBackend) {
	return {
		replace: false,
		restrict: 'E',
		templateUrl: '/templates/directives/zn_user.html',
		scope: {
			user: '='
		},
		link: function (scope, el, attr) {
//			MRBackend.getModel('novelVote').then(function (voteModel) {
//				scope.ready = true;
//				scope.remove = function () {
//					voteModel.remove(scope.vote);
//				}
//			});

		}
	}
});