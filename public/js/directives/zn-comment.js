angular.module('zakonomat').directive('znComment', function (MRBackend, userService) {
    return {
        replace: false,
        restrict: 'E',
        templateUrl: '/templates/directives/zn_comment.html',
        scope: {
            comment: '='
        },
        link: function (scope, el, attr) {
            MRBackend.getModels(['commentVote', 'comment']).then(function (models) {
                scope.repliesLQ = models.comment.liveQuery().find({reply_on: scope.comment._id}).sort('-vote_count.karma')
                    .populate('owner', 'fb.username fb.picture.data.url').exec();

                userService.loginPromise.then(function (profile) {
                    if (profile._id) {
                        models.commentVote.query().findOne({owner: profile._id, subject: scope.comment._id}).exec().then(function (commentVote) {
                            scope.userVote = commentVote;
                        });

                        /**
                         * @returns {boolean}
                         */
                        scope.canRemove = function () {
                            if (scope.repliesLQ.docs.length === 0) {
                                if (scope.comment.owner.fb.username === profile.fb.username) {  //we don't have owner Id populated
                                    return true;
                                }
                            }
                            return false;
                        };

                        scope.removeComment = function () {
                            models.comment.remove(scope.comment);
                        }
                    }
                });


                scope.vote = function (how) {
                    function create() {
                        models.commentVote.create({subject: scope.comment._id, value: how}).then(function (vote) {
                            scope.userVote = vote;
                        })
                    }

                    if (scope.userVote) {
                        if (scope.userVote.value === how) {
                            models.commentVote.remove(scope.userVote).then(function () {
                                scope.userVote = null;
                            });
                        } else {
                            models.commentVote.remove(scope.userVote).then(function () {
                                create();
                            });
                        }

                    } else {
                        create();
                    }

                };

                scope.createReply = function () {
                    scope.newReply.reply_on = scope.comment._id;
                    scope.newReply.root = scope.comment.root;
                    models.comment.create(scope.newReply).then(function () {
                        scope.newReply = null;
                    });
                };
                scope.cancelReply = function () {
                    scope.newReply = null;
                };


            });

        }
    }
});