var Schema = require('mongoose').Schema;

module.exports = function (MR) {

    return MR('vote', {
        subject: { type: Schema.Types.ObjectId, required: true },
        creation_date: { type: Date, default: Date.now },
        value: Boolean,
        owner: { type: Schema.Types.ObjectId, ref: 'user' }
    }, {
        C: 1,
        R: 0,
        U: 5,
        D: 5
    });
};
