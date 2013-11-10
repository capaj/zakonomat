
module.exports = function (MR) {
    var user = MR('user', {
        FB_token: String,
        FB_id: Number,
        user_since: Number,
        born: Date,
        vote_count: Number,
        negative_vote_count: Number,
        positive_vote_count: Date
    });

    var novel = MR('novel', {
        title: String,
        started: Date,
        ended: Date,
        fighters: [{ type: Schema.Types.ObjectId, ref: 'Fighter' }]
    });
};
