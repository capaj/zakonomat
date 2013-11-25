module.exports = function (userModel) {
    return function (handshake, CB) {
        var socket = this;
        var aToken = handshake.query.aToken;
        if (aToken) {
            console.log("user wants to authorize with token: " + aToken );
            userModel.findOne({access_token: aToken}).exec().then(function (user) {
                if (user) {
                    socket.user = user;
                    console.log("Authenticated user: " + user.name);
                    CB(null, true);
                } else {
                    //TODO call facebook and get users identity, store token in the users document, invalidate after 2 hours

                    userModel.fetchAcc(aToken).then(function (FBdata) {
                        userModel.findOne().where('fb.id').equals(aToken).exec()
                            .then(function (user) {
                                if (user) {
                                    user.access_token = aToken;
                                    user.save();
                                    CB(null, true);
                                } else {
                                    userModel.create(
                                        {
                                            fb: FBdata,
                                            access_token: aToken,
                                            privilige_level: 1
                                        }
                                    ).then(function () {
                                            CB()
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
        } else {
            socket.user = {privilige_level: 0};
            CB(null, true);
        }

    };

};