var Schema = require('mongoose').Schema;
var voteCount = require('./vote-count');

module.exports = function (MR, userMRM, novelMRM) {

    var novelVoteMR = MR.model('novelVote', {
        subject: { type: Schema.Types.ObjectId, ref: 'novel', required: true },
        creation_date: { type: Date, default: Date.now },
        value: Boolean,
        fb_post_id: String //when user shares the voting, this will be filled with facebook post id
    }, {
        permissions: {
            C: 1,
            R: 0,
            U: 50,
            D: 50
        },
        schemaInit: function (schema) {
            // makes sure only one vote per ownerXsubject exists
            schema.index({ owner: 1, subject: 1 }, { unique: true, dropDups: true });
        }

    });

	novelVoteMR.model.on('create', function (vote) {
		var incrementFor = function (doc) {
			if (doc) {
				voteCount.incrementVoteCounts(doc, vote);
			}
		};
		novelMRM.model.findOne({_id: vote.subject}).exec()
			.then(incrementFor).end();

	});

	novelVoteMR.model.on('remove', function (vote) {
		var decrementFor = function (doc) {
			if (doc) {
				voteCount.decrementVoteCounts(doc, vote);
			}
		};
		novelMRM.model.findOne({_id: vote.subject}).exec()
			.then(decrementFor).end();
	});


	return novelVoteMR;
};
