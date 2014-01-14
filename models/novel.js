var Schema = require('mongoose').Schema;
var voteCountPartial = require('./vote-count');
var mongoose = require('mongoose');

module.exports = function (MR) {
    var novelModel = MR.model('novel', {
        summary: {type: String},    //plain text, maximum length 600 characters
        content: String,    //HTML
        title: {type: String, required: true, unique: true},
        pull_req: {type: String},    //github pull request associated
        paragraph_text: {type: String},    //URL paragrafove zneni zakona(pdf)
        current_law_link: {type: String},    //link to zakonyprolidi.cz
        approved: {type: Boolean, default: false},  //should get approved after 10k positive votes
        approved_date: Date,    //TODO make a check for this
        ended_date: Date,
        comment_count: { type: Number, default: 0, min: 0 },
		vote_count: voteCountPartial.schema	// we could have this only as liveQuery on the client, but if we would, it
		// would be hard to sort the collection by these properties
    }, {
        permissions: {
            C: 10,
            R: 0,
            U: 50,
            D: 50
        }
    });


    novelModel.model.on('remove', function (novel) {
        var id = novel._id.toString();
        var nVModel = mongoose.model('novelVote');

        nVModel.find({subject: id}).exec().then(function (votes) {
            votes.forEach(function (vote) {
                vote.remove(function () {
                    console.log("Succesfully removed a vote " + vote._id + " because subject was removed.");
                });
            });
        }).end();
        var commentModel = mongoose.model('comment');

        commentModel.find({root: id}).exec().then(function (comments) {
            comments.forEach(function (comment) {
                comment.remove(function () {
                    console.log("Succesfully removed a comment " + comment._id + " because root was removed.");
                });
            });
        }).end();
    });

    return novelModel;
};



//TODO on remove remove all votes which subject is this