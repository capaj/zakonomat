app.controller('profileCtrl', function ($scope, userService) {
    $scope.user = userService.getCurrentLQ();


});