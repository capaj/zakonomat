//expects this kind of query:
//  liveQuery().populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();

angular.module('zakonomat').directive('znVote', function () {
	return {
		replace: false,
		restrict: 'E',
		templateUrl: '/templates/directives/zn_vote.html',
		scope: {
			vote: '='
		},
		link: function (scope, el, attr) {

		}
	}
});