var Schema = require('mongoose').Schema;
var voteCountPartial = require('./vote-count');
var mongoose = require('mongoose');
module.exports = function (MR) {

    var commentMR = MR.model('comment', {
        reply_on: { type: Schema.Types.ObjectId, ref: 'comment' },
        root: { type: Schema.Types.ObjectId, ref: 'novel', required: true },
        creation_date: { type: Date, default: Date.now },
        vote_count: voteCountPartial.schema,
        text: String,
        deleted: {type: Boolean, default: false}
    },{
        permissions: {
            C: 1,
            R: 0,
            U: 50,
            D: 50
        }
    });

    var nModel = mongoose.model('novel');

    commentMR.model.on('create', function (comment) {
        nModel.findOne({_id: comment.root}).exec().then(function (novel) {
            novel.comment_count += 1;
            novel.save()
        }).end();
    });

    commentMR.model.on('remove', function (comment) {
        nModel.findOne({_id: comment.root}).exec().then(function (novel) {
            novel.comment_count -= 1;
            novel.save()
        }).end();
    });

    return commentMR;
};
