var Schema = require('mongoose').Schema;
var voteCountPartial = require('./vote-count');


module.exports = function (MR) {

    return MR.model('comment', {
        replyTo: { type: Schema.Types.ObjectId, ref: 'comment' },
        owner: { type: Schema.Types.ObjectId, ref: 'user' },
        author: {name: String, fb_nick: String}, //owners full name
        creation_date: { type: Date, default: Date.now },
        vote_count: voteCountPartial,
        text: String
    });
};
