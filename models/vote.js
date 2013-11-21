var Schema = require('mongoose').Schema;

module.exports = function (MR) {

    return MR('novelVote', {
        subject: { type: Schema.Types.ObjectId, ref: 'novel', required: true },
        creation_date: { type: Date, default: Date.now },
        value: Boolean,
        owner: { type: Schema.Types.ObjectId, ref: 'user', required: true }
    }, {
        C: 10,
        R: 0,
        U: 50,
        D: 50
    });
};
