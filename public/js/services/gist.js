app.service('gistService',
    function gistService($http, $q, $log) {
        this.getGist = function (id) {
            return $http.get('https://api.github.com/gists/' + id).then(function (res) {
                return res.data;
            });
        };

        this.getRevision = function (gist, revNum) {
            var url = gist.history[revNum];
            return $http.get(url);
        }

    });
