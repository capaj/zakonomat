angular.module('zakonomat').directive('znComment', function (MRBackend) {
    var formatDate = function (dt) {
        return moment(dt).format('LL');
    };
    return {
        replace: false,
        restrict: 'E',
        templateUrl: '/templates/directives/zn_comment.html',
        scope: {
            comment: '='
        },
        link: function (scope, el, attr) {

            scope.$watch('comment.creation_date', function (newValue) {
                if (newValue) {
                    scope.created = formatDate(newValue);
                }
            });


        }
    }
});