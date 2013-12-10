app.controller('votesCtrl', function ($scope) {
    var liveQuery = $scope.MR.liveQuery;

    $scope.LQ = liveQuery().populate('subject', 'title').populate('owner', 'fb.username').exec();

////        1: {populate:['subject', 'title'], applyArgs: true}
////        2: {populate:['owner', 'fb', 'username'], applyArgs: true}

    $scope.LQ.promise.then(function (LQ) {
        console.log(LQ);
    });



});