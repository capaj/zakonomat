var Schema = require('mongoose').Schema;
var voteCount = require('./vote-count');
var mongoose = require('mongoose');

module.exports = function (MR) {

    var commentVote = MR.model('commentVote', {
        subject: { type: Schema.Types.ObjectId, ref: 'comment', required: true },
        creation_date: { type: Date, default: Date.now },
        value: Boolean
    }, {
        permissions: {
            C: 1,
            R: 0,
            U: 50,
            D: 50
        },
        pres:{
            onPrecreate: function (next, vote) {
                commentVote.model.findOne({subject: vote.subject, owner:vote.owner}).exec()
                    .then(function (existingVote) {
                        if (existingVote) {
                            // if vote already exists, then the previous must be removed
                            existingVote.remove(function (err) {
                                next();
                            });
                            // this should not happen with official client, since the client app should guard this with it's logic
                        } else {
                            next();

                        }

                    });
            }
        }


    });

    var commentModel = mongoose.model('comment');
    var voteModel = commentVote.model;

    /**
     *
     * @param {Mongoose.Document} doc is any model which keeps counts on votes
     * @param {Mongoose.Document} vote
     */

    voteModel.on('create', function (vote) {
        var incrementFor = function (doc) {
            if (doc) {
                voteCount.incrementVoteCounts(doc, vote);
            }
        };
        commentModel.findOne({_id: vote.subject}).exec()
            .then(incrementFor).end();
    });

    /**
     *
     * @param {Mongoose.Document} doc is any model which keeps counts on votes
     * @param {Mongoose.Document} vote
     */

    voteModel.on('remove', function (vote) {
        var decrementFor = function (doc) {
            if (doc) {
                voteCount.decrementVoteCounts(doc, vote);
            }
        };
        commentModel.findOne({_id: vote.subject}).exec()
            .then(decrementFor).end();
    });

    return commentVote;
};
