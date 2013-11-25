app.controller('userCtrl', function ($scope, $routeParams) {
    var liveQuery = $scope.MR.liveQuery;
    if (obj) {

    }
    $scope.LQ = liveQuery({where: 'fb.id', equals: $routeParams.userId});
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });

    $scope.changeQuery = function () {
        $scope.LQ.query.limit = 2;
    };

    $scope.getter = function () {
        return LQ.docs[0];
    };


});