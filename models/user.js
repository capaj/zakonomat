var Schema = require('mongoose').Schema;

module.exports = function (MR) {

    return MR.userModel('user', {
        FB_acc: { type: Schema.Types.ObjectId, ref: 'FBaccount' },
        creation_date: { type: Date, default: Date.now },
        born_date: Date,
        access_token: String,
		/**
		 * all can read any other model
		 * CRUD letters here have the same meaning as in CRUD
		 * privilige levels:
		 * 0(no privileges) - special case for users which are not verified on facebook, can just read, no other
		 * 10(clicktivist) - can R any votes, comments, users, can CUD his own votes, comments	=our users by default
		 * 20(creative clicktivist) - 1 + can CUD his own novels									=our users in the future
		 * 30(submoderator) - 2 + can D any comment
		 * 40(moderator) - 3 + can D any novel
		 * 50(admin) - 4 + can D any user
		 */
        privilige_level: {
            type: Number, default: 1, min:0, max: 50,
            permissions:{R: 0, W: 50}
        },
        casted_votes_count: { type: Number, default: 0, min:0},
        negative_vote_count: { type: Number, default: 0, min:0},
        positive_vote_count: { type: Number, default: 0, min:0},
        novel_votes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
    });
};
