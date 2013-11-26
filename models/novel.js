var Schema = require('mongoose').Schema;

module.exports = function (MR) {
    return MR.model('novel', {
        owner: { type: Schema.Types.ObjectId, ref: 'user' },
        content: String,    //HTML
        title: {type: String, required: true, unique: true},
        pull_req: {type: String, unique: true},    //github pull request associated
        paragraph_text: {type: String, unique: true},    //paragrafove zneni zakona
        approved: Boolean,
        approved_date: Date,
        ended_date: Date,
        votes_count: { type: Number, default: 0, min:0},
        negative_vote_count: { type: Number, default: 0, min:0},
        positive_vote_count: { type: Number, default: 0, min:0},
        votes: [{ type: Schema.Types.ObjectId, ref: 'novelVote' }]
    });
};
