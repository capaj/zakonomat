app.controller('rootCtrl', function ($scope, dialogService) {
	$scope.val = 'for test';	// just a dummy value for test
    var d = dialogService.create('why_we_need', '');
    $scope.whyWeNeedDialog = d.open;

});
