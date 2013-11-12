var Schema = require('mongoose').Schema;

module.exports = function (MR) {

    var user = MR('user', {
        FB_acc: { type: Schema.Types.ObjectId, ref: 'FBaccount' },
        creation_date: { type: Date, default: Date.now },
        born: Date,
		/**
		 * all can read any other model
		 * CRUD letters here have the same meaning as in CRUD
		 * privilige levels:
		 * 0(no privileges) - special case for users which are not verified on facebook, can just read, no other
		 * 1(clicktivist) - can R any votes, comments, users, can CUD his own votes, comments	=our users by default
		 * 2(creative clicktivist) - 1 + can CUD his own novels									=our users in the future
		 * 3(submoderator) - 2 + can D any comment
		 * 4(moderator) - 3 + can D any novel
		 * 5(admin) - 4 + can D any user
		 */
        privilige_level: { type: Number, default: 1, min:0, max: 5},
        vote_count: Number,
        negative_vote_count: Number,
        positive_vote_count: Number
    });
};
