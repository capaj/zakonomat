app.controller('novelsCtrl', function ($scope, dialogService) {
    var d = dialogService.create('create_novel', '');

    $scope.whyWeNeedDialog = function () {
        d.open();
    };

});