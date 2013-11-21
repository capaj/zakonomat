var Schema = require('mongoose').Schema;

module.exports = function (MR) {

    return MR('comment', {
        replyTo: { type: Schema.Types.ObjectId, ref: 'comment' },
        owner: { type: Schema.Types.ObjectId, ref: 'user' },
        author: {name: String, fb_nick: String}, //owners full name
        creation_date: { type: Date, default: Date.now },
        text: String,
        vote_count: Number,
        negative_vote_count: Number,
        positive_vote_count: Number
    });
};
