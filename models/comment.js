var Schema = require('mongoose').Schema;
var voteCountPartial = require('./vote-count');

module.exports = function (MR) {

    return MR.model('comment', {
        reply_on: { type: Schema.Types.ObjectId, ref: 'comment' },
        creation_date: { type: Date, default: Date.now },
        vote_count: voteCountPartial,
        text: String
    });
};
