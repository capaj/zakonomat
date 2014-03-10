app.controller('usersCtrl', function ($scope, $location, user) {
    var liveQuery = user.liveQuery;
    var limit = $location.search().limit || 50;

    $scope.LQ = liveQuery().limit(limit).exec();
    $scope.usersCountLQ = liveQuery().count().exec();
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });

});