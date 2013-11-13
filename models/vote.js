var Schema = require('mongoose').Schema;

module.exports = function (MR) {

    return MR('vote', {
        subject: { type: Schema.Types.ObjectId, required: true },
        creation_date: { type: Date, default: Date.now },
        value: Boolean,
        caster: { type: Schema.Types.ObjectId, ref: 'user' }
    });
};
