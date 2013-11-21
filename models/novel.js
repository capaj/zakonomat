var Schema = require('mongoose').Schema;

module.exports = function (MR) {
    return MR('novel', {
        owner: { type: Schema.Types.ObjectId, ref: 'user' },
        content: String,    //HTML
        title: String,
        pull_req: String,    //github pull request associated
        started: Date,
        accepted: Boolean,
        ended: Date,
        negative_vote_count: Number,
        positive_vote_count: Number,
        votes: [{ type: Schema.Types.ObjectId, ref: 'novelVote' }]
    });
};
