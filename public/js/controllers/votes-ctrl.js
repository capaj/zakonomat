app.controller('votesCtrl', function ($scope, $location, debounce) {
    var nVLQ = $scope.MR.novelVote.liveQuery;
    var nLQ = $scope.MR.novel.liveQuery;
    var search = $location.search();

    function runQueries() {
        $scope.votesLQ = nVLQ().find(search).sort('-creation_date').populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();
        $scope.voteCountLQ = nVLQ().find(search).count().exec();

        if (search.subject) {
            $scope.subjectLQ = nLQ().findOne().where('_id').equals(search.subject).exec();
        } else {
            $scope.subjectLQ = null;
        }
    }

    runQueries();

    $scope.$on('$routeUpdate', runQueries);

    $scope.positiveNVLQ = nVLQ().find({value: true}).count().exec();
    $scope.negativeNVLQ = nVLQ().find({value: false}).count().exec();

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