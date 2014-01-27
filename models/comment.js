var Schema = require('mongoose').Schema;
var voteCountPartial = require('./vote-count');
var mongoose = require('mongoose');
var Promise = require('bluebird');

module.exports = function (MR) {
    var nModel = mongoose.model('novel');
    var commentVoteModel;

    var commentMR = MR.model('comment', {
        reply_on: { type: Schema.Types.ObjectId, ref: 'comment' },
        root: { type: Schema.Types.ObjectId, ref: 'novel', required: true },
        creation_date: { type: Date, default: Date.now },
        vote_count: voteCountPartial.schema,
        text: String,
        deleted: {type: Boolean, default: false}
    },{
        permissions: {
            C: 1,
            R: 0,
            U: 50,
            D: 50
        },
        pres:{
            onPreremove: function (next, comment) {
                commentMR.model.find({reply_on: comment._id}).exec().then(function (replies) {
                    if (replies.length === 0) {
                        commentVoteModel = mongoose.model('commentVote');
                        commentVoteModel.find({subject: comment._id}).exec().then(function (commentVotes) {
                            var promises = [];
                            commentVotes.forEach(function (vote) {
                                var pr = Promise.defer();
                                promises.push(pr.promise);
                                vote.remove(function (err) {
                                    if (err) {
                                        console.error(err);
                                        pr.reject();
                                    }
                                    pr.resolve();
                                });
                            });
                            Promise.all(promises).then(function () {
                                next();
                            })
                        });
                    }
                });
            }
        }
    });



    commentMR.model.on('create', function (comment) {
        nModel.findOne({_id: comment.root}).exec().then(function (novel) {
            novel.comment_count += 1;
            novel.save()
        }).end();

    });

    commentMR.model.on('remove', function (comment) {
        nModel.findOne({_id: comment.root}).exec().then(function (novel) {
            novel.comment_count -= 1;
            novel.save()
        }).end();


    });

    return commentMR;
};
