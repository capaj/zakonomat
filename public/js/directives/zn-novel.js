//expects this kind of query:
//  liveQuery().populate('subject', 'title').populate('owner', 'fb.username fb.picture.data.url').exec();

angular.module('zakonomat').directive('znNovel', function (MRBackend, userService, facebook, $q) {
	return {
		replace: false,
		restrict: 'E',
		templateUrl: '/templates/directives/zn_novel.html',
		scope: {
			novel: '='
		},
		link: function (scope, el, attr) {
            $q.all({voteModel: MRBackend.getModel('novelVote'), profile: userService.loginPromise}).then(function (resolved) {
                var profile = resolved.profile;
                var voteModel = resolved.voteModel;
                var VMLQ = voteModel.liveQuery;
                var isAnon = !profile._id;
                scope.isAnon = isAnon;
                scope.votesSum = function () {
                    if (!scope.novel) {
                        return 0;
                    }
                    return scope.novel.vote_count.positive + scope.novel.vote_count.negative;
                };

                if (isAnon) {
                    scope.fbLogin = function () {
                        facebook.login();
                    };

                    return; //two methods after this are only for registered users
                }
                scope.delete = function () {
                    //TODO delete method for novel
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
                                link: RPCbackendURL + 'navrh?_id=' + novel._id,
                                picture: RPCbackendURL + 'img/zakonomat-web-maly-bily.png'//TODO should be unique for a novel
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
				//current vote LQ

                scope.expandOverallVotes = function (show) {
                    if (show === false) {
                        scope.showedVotes.stop();
                        scope.showedVotes = null;
                    } else {
                        scope.showedVotes = VMLQ().find({subject: scope.novel._id}).populate('owner','fb.username fb.picture.data.url').exec();
                    }
                    scope.overallVotesExpanded = show;
                    if (!scope.showedVotes) {

                    }
                };

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

			});
		}
	}
});