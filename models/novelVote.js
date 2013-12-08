var Schema = require('mongoose').Schema;

module.exports = function (MR, userMRM, novelMRM) {

    var novelVoteMR = MR.model('novelVote', {
        subject: { type: Schema.Types.ObjectId, ref: 'novel', required: true },
        creation_date: { type: Date, default: Date.now },
        value: Boolean,
        owner: { type: Schema.Types.ObjectId, ref: 'user', required: true }
    }, {
        permissions: {
            C: 10,
            R: 0,
            U: 50,
            D: 50
        },
        pres:{
            onPrecreate: function (next, vote) {
                novelVoteMR.model.findOne({subject: vote.subject, owner:vote.owner}).exec()
                    .then(function (existingVote) {
                        if (existingVote) {
                            // if vote already exists, then the previous must be removed
                            existingVote.remove(function (err) {
                                next();
                            });
                            // this should not happen with official client, since the client app should guard this
                        } else {
                            next();

                        }

                    });
            }
        }


    });

    return novelVoteMR;
};
