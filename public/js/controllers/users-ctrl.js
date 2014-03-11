app.controller('usersCtrl', function ($scope, $location, user) {
    var liveQuery = user.liveQuery;

    var runQueries = function () {
        var limit = $location.search().limit || $scope.pagination.limit;

        $scope.LQ = liveQuery().limit(limit).skip($scope.pagination.skip).exec();
        $scope.userCountLQ = liveQuery().count().exec();
        $scope.LQ.promise.then(function (LQ) {
            console.log(LQ);
        });
    };
    var pag = $location.search().pagination;
    if (pag) {
        pag = JSON.parse(pag)
    }

    $scope.pagination = pag ||  {   //default values
        page: 1,
        limit: 15,
        skip: 0
    };
    $scope.pagination.onSelect = function (page) {
        var pagin = $scope.pagination;
        pagin.page = page;
        pagin.skip = (page - 1) * pagin.limit;
        $location.search('pagination', JSON.stringify(pagin));  //triggers routeUpdate event
    };

    $scope.$on('$routeUpdate', runQueries);
    runQueries();

});