app.controller('usersCtrl', function ($scope, $location) {
    var liveQuery = $scope.MR.liveQuery;
    var limit = $location.search().limit || 50;

    $scope.LQ = liveQuery().limit(limit).exec();
    $scope.usersCountLQ = liveQuery().count().exec();
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });

});