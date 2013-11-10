app.controller('novelsCtrl', function ($scope, dialogService, facebook) {
    var d = dialogService.create('create_novel', '');

    $scope.whyWeNeedDialog = function () {
        d.open();
    };

    $scope.model.find().then(function (novels) {
        $scope.novels = novels;

    });
    facebook.tokenPromise.then(function (token) {
        console.log("FB token is " + token);
        RPCBackend.loadChannel('voting', token).then(function (chnl) {
            chnl.vote({});
        });
    })

});