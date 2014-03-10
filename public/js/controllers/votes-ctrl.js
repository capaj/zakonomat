app.controller('votesCtrl', function ($scope, $location, debounce, models) {
    var nVLQ = models.novelVote.liveQuery;
    var nLQ = models.novel.liveQuery;
    var search = $location.search();


    function runQueries() {
        search = $location.search();
        var voteSearch = angular.copy(search);
        delete voteSearch.pagination;

        var voteSearchQueryBase = function () {
            return nVLQ().find(voteSearch);
        };
        $scope.positiveNVLQ = voteSearchQueryBase().find({value: true}).count().exec();
        $scope.negativeNVLQ = voteSearchQueryBase().find({value: false}).count().exec();

        $scope.votesLQ = voteSearchQueryBase().sort('-creation_date')
            .populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url')
            .limit($scope.pagination.limit).skip($scope.pagination.skip)
            .exec();
        $scope.voteCountLQ = voteSearchQueryBase().count().exec();

        if (voteSearch.subject) {
            $scope.subjectLQ = nLQ().findOne().where('_id').equals(voteSearch.subject).exec();
        } else {
            $scope.subjectLQ = null;
        }
    }

    $scope.pagination = {   //default values
        page: 1,
        limit: 50,
        skip: 0,
        onSelect: function (page) {
            var pagin = $scope.pagination;
            pagin.page = page;
            pagin.skip = (page - 1) * pagin.limit;
            $location.search('pagination', JSON.stringify(pagin));  //triggers routeUpdate event
        }
    };
    if (search.pagination) {
        var pagination = JSON.parse(search.pagination);
        angular.extend($scope.pagination, pagination);
    }
    runQueries();

    $scope.$on('$routeUpdate', runQueries);

    $scope.showGraphs = function (shown) {
        $scope.graphsShown = shown;
        if (shown && !$scope.novelVoteCounts) {
            //chart utilities
            $scope.novelVoteCounts = [
                {
                    key: "pro",
                    y: 0
                },
                {
                    key: "proti",
                    y: 0
                }
            ];


            $scope.$watch('negativeNVLQ.count', debounce(function (nV, oV) {
                if (nV) {
                    $scope.novelVoteCounts[1].y = nV;
                }
            }, 500));

            $scope.$watch('positiveNVLQ.count', debounce(function (nV, oV) {
                if (nV) {
                    $scope.novelVoteCounts[0].y = nV;
                }
            }, 500));


            $scope.xFunction = function(){
                return function(d) {
                    return d.key;
                };
            }
            $scope.yFunction = function(){
                return function(d) {
                    return d.y;
                };
            }

            $scope.descriptionFunction = function(){
                return function(d){
                    return d.key;
                }
            }

            var colorArray = ['#008800', '#CC0000'];
            $scope.colorFunction = function() {
                return function(d, i) {
                    return colorArray[i];
                };
            }
        }
    }



});