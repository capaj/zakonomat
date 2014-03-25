angular.module('zakonomat').directive('fbUserPicture', function ($log) {
    return {
        replace: false,
        restrict: 'E',
        template: '<img ng-src="https://graph.facebook.com/{{ id }}/picture?type={{ type }}" ng-show="id">',
        scope: {
            id: '=',
            type: '@'   //possible values are: square,small,normal,large
        }
    }
});