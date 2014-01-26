app.service('gistService',
    function gistService($http, $q, $log) {
        var self = this;
        /**
         *
         * @param {Number} id
         * @returns {ng.IPromise<TResult>}
         */
        this.getGist = function (id) {
            return $http.get('https://api.github.com/gists/' + id).then(function (res) {
                return res.data;
            });
        };

        this.getRevision = function (gist, revNum) {
            var url = gist.history[revNum];
            return $http.get(url);
        };

        /**
         *
         * @param {Number} id
         */
        this.getFirstFileContent = function (id) {
            return self.getGist(id).then(function (gist) {
                var firstFile = gist.files[Object.keys(gist.files)[0]];
                return firstFile.content;
            });
        };


    });
