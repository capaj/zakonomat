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

	/**
	 *
	 * @param {Mongoose.Document} doc
	 * @param {Mongoose.Document} vote
	 */
	var incrementVoteCounts = function (doc, vote) {
		doc.votes_count += 1;
		if (vote.value === true) {
			doc.positive_vote_count += 1;
		}
		if(vote.value === false) {
			doc.negative_vote_count += 1;
		}
		doc.save();
	};

    novelVoteMR.model.on('create', function (vote) {
        novelVoteMR.model.findOne({subject: vote.subject, owner:vote.owner}).exec()
            .then(function (existingVote) {
                if (existingVote) {
                    // if vote already exists, then the previous must be removed
                    existingVote.remove();
                    // this should not happen with official client, since the client app should guard this
                }
				var incrementFor = function (doc) {
					incrementVoteCounts(doc, vote);
				};
                userMRM.model.findOne({_id: vote.owner._id}).exec()
                    .then(incrementFor);
                novelMRM.model.findOne({_id: vote.subject._id}).exec()
                    .then(incrementFor);
            })
    });

	/**
	 *
	 * @param {Mongoose.Document} doc
	 * @param {Mongoose.Document} vote
	 */
	var decrementVoteCounts = function (doc, vote) {
        doc.votes_count -= 1;
        if (vote.value === true) {
            doc.positive_vote_count -= 1;
        }
		if(vote.value === false) {
            doc.negative_vote_count -= 1;
        }
        doc.save();
    };

    novelVoteMR.model.on('remove', function (vote) {
        var decrementFor = function (doc) {
			decrementVoteCounts(doc, vote);
		};
		userMRM.model.findOne({_id: vote.owner._id}).exec()
            .then(decrementFor);
        novelMRM.model.findOne({_id: vote.subject._id}).exec()
            .then(decrementFor);
    });

    novelVoteMR.model.on('preupdate', function (doc, evName, previous){

		decrementVoteCounts(doc, doc);	// novelVote doc
		userMRM.model.findOne({_id: vote.owner._id}).exec()
			.then(function (obj) {

			});	//user docs

		incrementVoteCounts(doc);

    });


    return novelVoteMR;
};
