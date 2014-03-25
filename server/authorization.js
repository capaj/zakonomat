module.exports = function (userModel, io) {
    io.sockets.on('connection', function(socket) {
        socket.on('disconnect', function() {

            var handshake = this.manager.handshaken[socket.id];
            if (handshake && handshake.user) {
                handshake.user.online = false;
                handshake.user.save(function (err) {
                    err && console.error("");
                });
            } else {
                throw new Error("Handshake user data not found, either they weren't added, or they were deleted in the past");
            }
        });
    });

    return function (handshake, CB) {

        var aToken = handshake.query.aToken;
        var authSucces = function (user) {
            handshake.user = user;
            if (user.online === false) {
                user.online = true;
                user.save(function (err) {
                    if (err) {
                        console.log('Failed to save user ' + user.fb.username + ' so auth failed');
                        CB(err, false);
                    }
                    console.log("Authenticated user: " + user.fb.username);
                    CB(null, true);
                });
            } else {
                console.log("Authenticated user: " + user.fb.username);
                CB(null, true);
            }
        };
        if (aToken) {
            if (aToken === 'ANON') {
                console.log("anonymous user wants to authorize");
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
                            userModel.findOne({'fb.id': FBdata.id}).exec()
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
                            console.error("Error fetching user from FB: " + err);
                            CB(err, false);
                        });
                    }

                }, function (err) {
                    console.error("Error looking up the user in the DB: " + err);
                    CB(err, false);
                });
            }

        } else {
            var err = new Error("User must send a token");
            CB(err, false);
        }

    };

};