var Schema = require('mongoose').Schema;
var request = require('request');
var Promise = require('bluebird');
var voteCountPartial = require('./vote-count');


module.exports = function (MR) {

    var userMRM = MR.userModel({
        fb: {
            id: {type: String, required: true},
            first_name: {type: String, required: true},
            last_name: {type: String, required: true},
            gender: {type: String, required: true},
            username: {type: String, required: true},   //FB username for constructing FB links and for fetching the user via routeparams on userDetail
            verified: {type: Boolean, required: true},
            birthday: {type: String, required: true},
            email: {type: String, required: true},
            picture: {
                data:{
                    url: String,
                    is_silhouette: String
                }
            },
			location: {id: String, name: String},
			hometown: {id: String, name: String}
        },
        creation_date: { type: Date, default: Date.now },
        access_token: { type: String, permissions:{R:50, W:50}},   //FB access token
		/**
		 * all can read any other model
		 * CRUD letters here have the same meaning as in CRUD
		 * privilige levels:
		 * 0(no privileges) - special case for users which are not verified on facebook, can just read, no other
		 * 10(clicktivist) - can R any votes, comments, users, can CUD his own votes, comments	=our users by default
		 * 20(creative clicktivist) - 1 + can CUD his own novels									=our users in the future
		 * 30(submoderator) - 2 + can D any comment
		 * 40(moderator) - 3 + can D any novel
		 * 50(admin) - 4 + can D any user
		 */
        privilige_level: {
            type: Number, default: 1, min:0, max: 50,
            permissions:{R: 0, W: 50}
        },
        novel_votes: [{ type: Schema.Types.ObjectId, ref: 'novelVote' }],
		settings: {
			fb_publish: {type:Boolean, default:true}
		}
    }, {
		statics: {
			fetchAcc: function (token) {
				var deferred = Promise.defer();
				request('https://graph.facebook.com/me?access_token=' + token + '&fields=id,email,first_name,last_name,username,birthday,gender,installed,verified,picture,currency,location,hometown', function (error, response, body) {
					if (!error && response.statusCode == 200) {
						var fbAccDetails = JSON.parse(body);
						deferred.resolve(fbAccDetails);
					} else {
						deferred.reject();
					}
				});
				return deferred.promise;
			}
		}
	});

	userMRM.model.on('create', function (user) {
		console.log("created user: " + user);
	});
    //TODO on remove remove all votes which have owner just removed user
    return userMRM;
};
