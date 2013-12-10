app.controller('userDetailCtrl', function ($scope, $location) {
    var liveQuery = $scope.MR.liveQuery;
    if ($location.search()) {
        $scope.LQ = liveQuery().where('fb.username').equals($location.search().name).exec();
    }
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });


    $scope.$watch('findByName', function (nV, oV) {
        $location.search('name', nV);
        $scope.LQ.query.equals = nV;
    });


    $scope.getter = function () {
        return LQ.docs[0];
    };


});