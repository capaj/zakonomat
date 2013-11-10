var Schema = require('mongoose').Schema;

module.exports = function (MR) {

    var vote = MR('vote', {
        subject: { type: Schema.Types.ObjectId, ref: 'novel' },
        creation_date: { type: Date, default: Date.now },
        positive: Boolean,
        caster: { type: Schema.Types.ObjectId, ref: 'novel' }
    });
};
