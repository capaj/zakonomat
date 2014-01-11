app.factory('RPCBackend', function RPCBackend ($rpc, $window) {
    $rpc.connect($window.RPCbackendURL);
    return $rpc;
}).factory('MRBackend', function MRBackend($rootScope, $q, $log, facebook, $location, $MR, dialogService) {

        var dfd = $q.defer();

        var MRB = $MR('znmt', dfd.promise);

        facebook.onLogin.register(function (token) {
            if (facebook.aToken === 'ANON') {
                if (MRB.socket) { // means that user is connected already as anonymous

                    document.location.reload(true); //a bit of a hack, will have to reconnect with the new token here
//                    MRB.socket.disconnect();
//                    MRB = $MR('znmt', dfd.promise);
                }
            }

//            dfd.resolve({url: 'http://dem2.cz:8076', hs: { query: "aToken=" + token } } );
            dfd.resolve({url: 'http://localhost:8076', hs: { query: "aToken=" + token } } );

        });

        var errDlg = dialogService.create('error_modal', 'error-modal',
            {
                msg: 'Připojení k serveru není k dispozici, omlouváme se, ale doporučujeme vám obnovit stránku.',
                btnTitle: 'Nahrát aplikaci znovu',
                reload: function () {
                    location.reload(false);
                }
            });

        MRB.connectPromise.then(function (socket) {
            //you can hook up more events here


//            socket.on('connect_failed', errDlg.open);
//            socket.on('reconnect_failed', errDlg.open);
            socket.on('disconnect', function () {
                errDlg.open();
                console.log("socket disconnected");
            });
        });

        return MRB

    });

