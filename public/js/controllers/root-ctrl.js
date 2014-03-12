app.controller('rootCtrl', function ($scope, dialogService, models) {
    var d = dialogService.create('why_we_need', '');
    $scope.whyWeNeedDialog = function () {
        d.open();
    };

    $scope.userCountLQ = models.user.liveQuery().count().exec();
    $scope.voteCountLQ = models.novelVote.liveQuery().count().exec();

});
