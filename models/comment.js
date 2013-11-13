var Schema = require('mongoose').Schema;

module.exports = function (MR) {

    return MR('comment', {
        replyTo: { type: Schema.Types.ObjectId, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'user' },
        creation_date: { type: Date, default: Date.now },
        text: String,
        vote_count: Number,
        negative_vote_count: Number,
        positive_vote_count: Number
    });
};
