app.controller('novelsCtrl', function ($scope, MRBackend, $location) {
    var liveQuery = $scope.MR.liveQuery;
    $scope.LQ = liveQuery({});
    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });


    $scope.getter = function () {
        return LQ.docs[0];
    };
    MRBackend.getModel('novelVote').then(function (model) {
        $scope.vote = function (novel, how) {
            model.create({subject: novel._id, value: how});
        };
    })



});