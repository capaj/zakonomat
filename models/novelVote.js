var Schema = require('mongoose').Schema;

module.exports = function (MR, userMRM, novelMRM) {

    var novelVoteMR = MR.model('novelVote', {
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

    var incrementVoteCounts = function (doc) {
        doc.votes_count += 1;
        if (vote.value) {
            doc.positive_vote_count += 1;
        } else {
            doc.negative_vote_count += 1;
        }
        doc.save();
    };

    novelVoteMR.model.on('create', function (vote) {
        novelVoteMR.model.findOne({subject: vote._id, owner:vote.owner}).exec()
            .then(function (existingVote) {
                if (existingVote) {
                    // if vote already exists, then the previous must be removed
                    existingVote.remove();
                    // this should not happen with official client, since the client app should guard this
                }
                userMRM.model.findOne({_id: vote.owner._id}).exec()
                    .then(incrementVoteCounts);
                novelMRM.model.findOne({_id: vote.subject._id}).exec()
                    .then(incrementVoteCounts);
            })
    });

    var decrementVoteCounts = function (doc) {
        doc.votes_count -= 1;
        if (vote.value) {
            doc.positive_vote_count -= 1;
        } else {
            doc.negative_vote_count -= 1;
        }
        doc.save();
    };
    novelVoteMR.model.on('remove', function (vote) {
        userMRM.model.findOne({_id: vote.owner._id}).exec()
            .then(decrementVoteCounts);
        novelMRM.model.findOne({_id: vote.subject._id}).exec()
            .then(decrementVoteCounts);
    });

    novelVoteMR.model.on('preupdate', function (vote, previousVersion) {

    });

    return  novelVoteModel;
};
