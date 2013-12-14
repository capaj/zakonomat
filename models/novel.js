var Schema = require('mongoose').Schema;
var voteCountPartial = require('./vote-count');

module.exports = function (MR) {
    return MR.model('novel', {
        owner: { type: Schema.Types.ObjectId, ref: 'user' },
        content: String,    //HTML
        title: {type: String, required: true, unique: true},
        pull_req: {type: String},    //github pull request associated
        paragraph_text: {type: String},    //URL paragrafove zneni zakona(pdf)
        current_law_link: {type: String},    //link to zakonyprolidi.cz
        approved: Boolean,
        approved_date: Date,
        ended_date: Date,
		vote_count: voteCountPartial
    });
};
