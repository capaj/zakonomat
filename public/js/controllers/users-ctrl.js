app.controller('usersCtrl', function ($scope, $routeParams) {
    var liveQuery = $scope.MR.liveQuery;

    $scope.LQ = liveQuery().exec();
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });



});