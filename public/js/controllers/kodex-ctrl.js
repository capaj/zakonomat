app.controller('kodexCtrl', function ($scope, $http) {
    $http.get('https://api.github.com/gists/8531233').then(function (gist) {
//        debugger;
        $scope.mdContent = gist.data.files.kodex.content;
    });
});