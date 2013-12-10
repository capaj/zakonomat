//use as a partial in documents where you need voting
module.exports = {   //of this document's votes
    positive: { type: Number, default: 0, min:0},
    negative: { type: Number, default: 0, min:0}
};