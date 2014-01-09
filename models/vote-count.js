//use as a partial in documents where you need voting
module.exports = {   //of this document's votes
    schema: {
        karma: { type: Number, default: 0 },
        sum: { type: Number, default: 0, min:0 },
        positive: { type: Number, default: 0, min:0 },
        negative: { type: Number, default: 0, min:0 }
    },
    /**
     *
     * @param {Mongoose.Document} doc is any model which keeps counts on votes
     * @param {Mongoose.Document} vote
     */
    incrementVoteCounts: function (doc, vote) {
        doc.vote_count.sum += 1;
        if (vote.value === true) {
            doc.vote_count.positive += 1;
            doc.vote_count.karma += 1;
        } else {
            doc.vote_count.negative += 1;
            doc.vote_count.karma -= 1;
        }
        doc.save();
    },
    /**
     *
     * @param {Mongoose.Document} doc is any model which keeps counts on votes
     * @param {Mongoose.Document} vote
     */
    decrementVoteCounts: function (doc, vote) {
        doc.vote_count.sum -= 1;
        if (vote.value === true) {
            doc.vote_count.positive -= 1;
            doc.vote_count.karma -= 1;

        } else {
            doc.vote_count.negative  -= 1;
            doc.vote_count.karma += 1;

        }
        doc.save();
    }

};