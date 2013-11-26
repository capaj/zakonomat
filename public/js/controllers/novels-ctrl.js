app.controller('novelsCtrl', function ($scope, $location) {
    var liveQuery = $scope.MR.liveQuery;
    $scope.LQ = liveQuery({});
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });


    $scope.getter = function () {
        return LQ.docs[0];
    };

    $scope.voteOnNovel = function (novel, how) {
        $scope.MR.create({subject: novel._id, value: how});
    };



});