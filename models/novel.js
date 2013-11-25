var Schema = require('mongoose').Schema;

module.exports = function (MR) {
    return MR.model('novel', {
        owner: { type: Schema.Types.ObjectId, ref: 'user' },
        content: String,    //HTML
        title: String,
        pull_req: String,    //github pull request associated
        started: Date,
        accepted: Boolean,
        ended: Date,
        votes_count: { type: Number, default: 0, min:0},
        negative_vote_count: { type: Number, default: 0, min:0},
        positive_vote_count: { type: Number, default: 0, min:0},
        votes: [{ type: Schema.Types.ObjectId, ref: 'novelVote' }]
    });
};
