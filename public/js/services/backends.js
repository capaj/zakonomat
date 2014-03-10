app.factory('MRBackend', function MRBackend($rootScope, $q, $log, facebook, $location, $MR, dialogService, loaderSvc) {

        var dfd = $q.defer();

        var MRB = $MR('znmt', dfd.promise, true);

        facebook.onLogin.register(function (token) {
            var connectAsGuest = function () {
                dfd.resolve({url: RPCbackendURL, hs: { query: "aToken=ANON" } } );
            };

            if (facebook.aToken === 'ANON') {
                if (MRB.socket) { // means that user is connected already as anonymous

                    document.location.reload(true); //a bit of a hack, will have to reconnect with the new token here
//                    MRB.socket.disconnect();
//                    MRB = $MR('znmt', dfd.promise);
                }
            }else if (token === 'ANON') {
                connectAsGuest();

            }

            // records that we need from FB
            var requiredFields = 'id,email,name,first_name,last_name,gender,link,installed,verified,picture';

            //records that we request
            var fieldsToRequest = 'id,email,name,first_name,birthday,last_name,gender,link,installed,verified,picture,location,hometown';

            facebook.api('/me?fields=' + fieldsToRequest)
                .then( function (me) {
                    if (!me.verified) {
                        dialogService.create('error_modal', 'error-modal',
                            {
                                msg: 'Váš facebook profil není ověřen. Ověřte ho a pak se budete moci přihlásit.',
                                btnTitle: 'Pokračova jako host bez možnosti hlasovat',
                                action: connectAsGuest
                            }).open();
                        return;
                    }

                    var fields = requiredFields.split(',');
                    var field;
                    while(field = fields.pop()) {
                        if (!me.hasOwnProperty(field)) {
                            $log.info('Facebook missing a ' + field);
                            dialogService.create('error_modal', 'error-modal',
                                {
                                    msg: 'Váš facebook profil nemá záznam ' + field + ', prosím doplňte jej a pak se budete moci přihlásit.',
                                    btnTitle: 'Pokračova jako host bez možnosti hlasovat',
                                    action: connectAsGuest
                                }).open();
                            return;
                        }
                    }
                    dfd.resolve({url: RPCbackendURL, hs: { query: "aToken=" + token } } );

                });
//            dfd.resolve({url: 'http://dem2.cz:8076', hs: { query: "aToken=" + token } } );

        });

        var errDlg = dialogService.create('error_modal', 'error-modal',
            {
                msg: 'Připojení k serveru není k dispozici, omlouváme se, ale doporučujeme vám obnovit stránku.',
                btnTitle: 'Nahrát aplikaci znovu',
                action: function () {
                    location.reload(false);
                }
            });

        MRB.connectPromise.then(function (socket) {
            //you can hook up more events here
            loaderSvc.deferred.resolve();

//            socket.on('connect_failed', errDlg.open);
//            socket.on('reconnect_failed', errDlg.open);
            socket.on('disconnect', function () {
                errDlg.open();
                console.log("socket disconnected");
            });
        });

        return MRB

    });

