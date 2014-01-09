module.exports = function loadModels(MR) {
    //MRM stand for Monnridge model
    var userMRM = require('./user')(MR);

    var novelMRM = require('./novel')(MR);
    return {
		user: userMRM,
		novel: novelMRM,
		novelVote: require('./novelVote')(MR, userMRM, novelMRM),
		comment: require('./comment')(MR),
        commentVote: require('./commentVote')(MR)
	};
};
