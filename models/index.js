module.exports = function loadModels(MR) {
    return {
		user: require('./user')(MR),
		novel: require('./novel')(MR),
		novelVote: require('./novelVote')(MR),
		comment: require('./comment')(MR),
		fbAccount: require('./fb-account')(MR)
	};
};
