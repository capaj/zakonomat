app.controller('usersCtrl', function ($scope, $routeParams) {
    var liveQuery = $scope.MR.liveQuery;
    if (obj) {

    }
    $scope.LQ = liveQuery({});
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });



});