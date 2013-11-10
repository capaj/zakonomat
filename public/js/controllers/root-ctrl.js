app.controller('rootCtrl', function ($scope, dialogService) {
    var d = dialogService.create('why_we_need', '');
    $scope.whyWeNeedDialog = function () {
        d.open();
    };

});
