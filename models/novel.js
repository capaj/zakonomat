var Schema = require('mongoose').Schema;

module.exports = function (MR) {
    return MR.model('novel', {
        owner: { type: Schema.Types.ObjectId, ref: 'user' },
        content: String,    //HTML
        title: {type: String, required: true, unique: true},
        pull_req: {type: String, unique: true},    //github pull request associated
        paragraph_text: {type: String, unique: true},    //paragrafove zneni zakona
        current_law_link: {type: String},    //link to zakonyprolidi.cz
        approved: Boolean,
        approved_date: Date,
        ended_date: Date,
        vote_count: { type: Number, default: 0, min:0}, //overall vote count for this novel
        negative_vote_count: { type: Number, default: 0, min:0},
        positive_vote_count: { type: Number, default: 0, min:0},
        votes: [{ type: Schema.Types.ObjectId, ref: 'novelVote' }]
    });
};
