var Schema = require('mongoose').Schema;
var voteCountPartial = require('./vote-count');
var novelVoteMRM = require('./novelVote');

module.exports = function (MR) {
    var novelModel = MR.model('novel', {
        summary: {type: String},    //plain text
        content: String,    //HTML
        title: {type: String, required: true, unique: true},
        pull_req: {type: String},    //github pull request associated
        paragraph_text: {type: String},    //URL paragrafove zneni zakona(pdf)
        current_law_link: {type: String},    //link to zakonyprolidi.cz
        approved: {type: Boolean, default: false},  //should get approved after 10k positive votes
        approved_date: Date,    //TODO make a check for this
        ended_date: Date,
        comment_count: { type: Number, default: 0, min: 0 },
		vote_count: voteCountPartial	// we could have this only as liveQuery on the client, but if we would, it
		// would be hard to sort the collection by these properties
    });

    novelModel.model.on('remove', function (novel) {
        var model = novelVoteMRM.model;
        model.find({subject: novel.subject}).exec().then(function (votes) {
            votes.forEach(function (vote) {
                model.remove(vote);
            });
        }).end();
    });

    return novelModel;
};



//TODO on remove remove all votes which subject is this