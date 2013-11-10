var Schema = require('mongoose').Schema;

module.exports = function (MR) {

    var user = MR('user', {
        FB_acc: { type: Schema.Types.ObjectId, ref: 'FBaccount' },
        creation_date: { type: Date, default: Date.now },
        born: Date,
        vote_count: Number,
        negative_vote_count: Number,
        positive_vote_count: Number
    });
};
