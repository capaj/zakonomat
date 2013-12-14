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

	/**
	 *
	 * @param {Mongoose.Document} doc
	 * @param {Mongoose.Document} vote
	 */
	var incrementVoteCounts = function (doc, vote) {
		doc.vote_count += 1;
		if (vote.value === true) {
			doc.vote_count.positive += 1;
		}
		if(vote.value === false) {
			doc.vote_count.negative  += 1;
		}
		doc.save();
	};

	novelVoteMR.model.on('create', function (vote) {
		var incrementFor = function (doc) {
			if (doc) {
				incrementVoteCounts(doc, vote);
			} else {
				throw new Error('Unable to find owner/subject documents');  //these should always be found
			}
		};
		novelMRM.model.findOne({_id: vote.subject}).exec()
			.then(function (novel) {
				novel.votes.push(vote._id);
				incrementFor(novel);

			});
	});

	/**
	 *
	 * @param {Mongoose.Document} doc
	 * @param {Mongoose.Document} vote
	 */
	var decrementVoteCounts = function (doc, vote) {
		doc.vote_count -= 1;
		if (vote.value === true) {
			doc.vote_count.positive -= 1;
		}
		if(vote.value === false) {
			doc.vote_count.negative  -= 1;
		}
		doc.save();
	};

	novelVoteMR.model.on('remove', function (vote) {
		var decrementFor = function (doc) {
			if (doc) {
				decrementVoteCounts(doc, vote);
			} else {
				throw new Error('Unable to find owner/subject documents');  //these should always be found
			}

		};
		novelMRM.model.findOne({_id: vote.subject}).exec()
			.then(decrementFor);
	});

//	novelVoteMR.model.on('preupdate', function (doc, evName, previous){
//
//		decrementVoteCounts(doc, doc);	// novelVote doc
//		userMRM.model.findOne({_id: vote.owner}).exec()
//			.then(function (obj) {
//
//			});	//user docs
//
//		incrementVoteCounts(doc);
//
//	});



	return novelVoteMR;
};
