var Schema = require('mongoose').Schema;
var voteCountPartial = require('./vote-count');
var mongoose = require('mongoose');

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
        var model = mongoose.model('novelVote');
        var id = novel._id.toString();
        model.find({subject: id}).exec().then(function (votes) {
            votes.forEach(function (vote) {
                vote.remove(function (obj) {
                    console.log("Succesfully removed a vote " + vote._id + " because subject was removed.");
                });
            });
        }).end();
    });

    return novelModel;
};



//TODO on remove remove all votes which subject is this