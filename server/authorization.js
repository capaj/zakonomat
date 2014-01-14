module.exports = function (userModel) {
    return function (handshake, CB) {
        var socket = this;
        var aToken = handshake.query.aToken;
        var authSucces = function (user) {
            socket.user = user;
            console.log("Authenticated user: " + user.fb.username);
            CB(null, true);
        };
        if (aToken) {
            if (aToken === 'ANON') {
                console.log("anonymouse user wants to authorize");
                var user = {
                    privilige_level: 0,
                    access_token: "ANON",
                    fb: {}
                };
                authSucces(user);
            } else {
                console.log("user wants to authorize with token: " + aToken );
                userModel.findOne({access_token: aToken}).exec().then(function (user) {
                    if (user) {
                        authSucces(user);

                    } else {
                        //TODO call facebook and get users identity, store token in the users document, invalidate after 2 hours

                        userModel.fetchAcc(aToken).then(function (FBdata) {
                            userModel.findOne({'fb.id':FBdata.id}).exec()
                                .then(function (user) {
                                    if (user) {
                                        user.access_token = aToken;
                                        user.save();
                                        authSucces(user);
                                    } else {
                                        if (FBdata.verified === false) {
                                            CB(new Error('Unverified account is trying to authorize'), false);
                                        }
                                        userModel.create({
                                            fb: FBdata,
                                            access_token: aToken,
                                            privilige_level: 1
                                        }).then(function (user) {
                                            console.log("Created a user: " + user);

                                            authSucces(user);
                                        }, function (err) {
                                            CB(err, false);	//failed
                                        });
                                    }
                                });
                        }, function (err) {

                            CB(err, false);
                        });
                    }

                }, function (err) {
                    console.log("auth error " + err);
                    CB(null, false);
                });
            }

        } else {
            var err = new Error("User must send a token");
            CB(err, false);
        }

    };

};