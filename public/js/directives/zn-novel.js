//expects this kind of query:
//  liveQuery().populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();

angular.module('zakonomat').directive('znNovel', function (MRBackend, userService, facebook, $q, gistService) {
	var getModels = MRBackend.getModels;
    return {
		replace: false,
		restrict: 'E',
		templateUrl: '/templates/directives/zn_novel.html',
		scope: {
			novel: '=',
            show: '@'       //can be 'all', 'summary', 'content'
		},
		link: function (scope, el, attr) {
            $q.all({
                models: getModels(['novelVote', 'user', 'novel', 'comment']),
                profile: userService.loginPromise
            }).then(function (resolved) {
                var profile = resolved.profile;
                var models = resolved.models;
                var voteModel = models.novelVote;
                var userModel = models.user;
                var VMLQ = voteModel.liveQuery;
                var isAnon = !profile._id;
                scope.isAnon = isAnon;

                scope.tooltip = {
                    "title": "Hello Tooltip<br />This is a multiline message!"
                };

                scope.votesSum = function () {
                    if (!scope.novel) {
                        return 0;
                    }
                    return scope.novel.vote_count.positive + scope.novel.vote_count.negative;
                };

                userModel.query().findOne({_id: scope.novel.owner}).select('fb.username fb.id').exec().then(function (owner) {
                    scope.owner = owner;

                });

                //current vote LQ
                var expanded;

                function createVotesShowMethod(findParam, scopeSwitchName) {
                    return function (show) {
                        if (show === false) {
                            scope.showedVotes && scope.showedVotes.stop();
                            scope.showedVotes = null;
                        } else {
                            if (expanded) {
                                scope[expanded] = false;
                            }
                            expanded = scopeSwitchName;
                            scope.showedVotes = VMLQ().find(findParam).populate('owner','fb.username fb.id').exec();
                        }
                        scope[scopeSwitchName] = show;
                    };
                }
                scope.expandOverallVotes = createVotesShowMethod({subject: scope.novel._id}, 'overallVotesExpanded');
                scope.expandPositiveVotes = createVotesShowMethod({subject: scope.novel._id, value: true}, 'positiveVotesExpanded');
                scope.expandNegativeVotes = createVotesShowMethod({subject: scope.novel._id, value: false}, 'negativeVotesExpanded');

                scope.$watch('novel', function (nV, oV) {
                    if (nV) {
                        if (scope.currentVoteLQ) {
                            scope.currentVoteLQ.stop();
                        }
                        if (!isAnon) {
                            var currUserCiteria = {subject: scope.novel._id, owner: userService.profile._id};
                            scope.currentVoteLQ = VMLQ().findOne(currUserCiteria).populate('subject', 'title').exec();
                        }
                    }
                });

                if (!scope.show) {
                    scope.show = 'summary';
                }

                gistService.getGist(scope.novel.gist_id).then(function (gist) {
                    scope.novelContent = gist.files[Object.keys(gist.files)[0]].content;
                    scope.gistDescription = gist.description;
                    //TODO add also a gist_rev

                });


                if (isAnon) {
                    scope.fbLogin = function () {
                        facebook.login();
                    };

                } else {
                    if (profile._id === scope.novel.owner) {
                        scope.remove = function () {
                            models.novel.remove(scope.novel);
                        };
                    }

                    scope.voteOnNovel = function (novel, how) {
                        var shareOnFacebook = function () {
                            if (userService.profile.settings.fb_publish) {
                                var howText;
                                var desc;
                                if (how) {
                                    howText = 'pro';
                                    desc = ' souhlasí s návrhem ';
                                } else {
                                    howText = 'proti';
                                    desc = ' nesouhlasí s návrhem ';

                                }
                                var params = {
                                    message: userService.profile.fb.first_name + ' hlasoval/a ' + howText + ' návrh ' + novel.title,
                                    name: novel.title,
                                    description: userService.getFullName() + desc,
                                    link: window.location.hostname + '/navrh?_id=' + novel._id,
                                    picture: window.location.hostname + '/img/zakonomat-web-maly-bily.png'//TODO should be unique for a novel
                                };


                                FB.api('/me/feed', 'post', params, function (response) {
                                    if (!response || response.error) {
                                        console.error('Error occured');
                                    } else {
                                        //TODO push post id into the DB and save
                                        console.log("Published to user's stream");
                                    }
                                });
                            }

                        };
                        voteModel.create({subject: scope.novel._id, value: how}).then(shareOnFacebook);
                    };

                }

                scope.getPositiveVotesPercentage = function () {
                    var onePercent = scope.novel.vote_count.sum / 100;
                    return (scope.novel.vote_count.positive / onePercent).toFixed(2);
                };

                scope.getNegativeVotesPercentage = function () {
                    var onePercent = scope.novel.vote_count.sum / 100;
                    return (scope.novel.vote_count.negative / onePercent).toFixed(2);
                };


			});
		}
	}
});