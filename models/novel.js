var Schema = require('mongoose').Schema;

module.exports = function (MR) {
    var novel = MR('novel', {
        title: String,
        content: String,    //HTML
        pull_req: String,    //github pull request associated
        started: Date,
        accepted: Boolean,
        ended: Date,
        negative_vote_count: Number,
        positive_vote_count: Number,
        votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
    });
};
