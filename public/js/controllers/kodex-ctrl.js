app.controller('kodexCtrl', function ($scope, gistService) {
    gistService.getGist(8531233).then(function (gist) {
        $scope.mdContent = gist.files.kodex.content;
    });
});