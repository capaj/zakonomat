app.controller('votesCtrl', function ($scope) {
    var liveQuery = $scope.MR.liveQuery;

    $scope.LQ = liveQuery({});
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });



});