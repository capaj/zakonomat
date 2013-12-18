app.factory('RPCBackend', function RPCBackend ($rpc, $window) {
    $rpc.connect($window.RPCbackendURL);
    return $rpc;
}).factory('MRBackend', function MRBackend($rootScope, $q, $log, facebook, $location, $MR, dialogService) {

        var dfd = $q.defer();
        facebook.onLogin.register(function (token) {

//            dfd.resolve({url: 'http://dem2.cz:8076', hs: { query: "aToken=" + token } } );
            dfd.resolve({url: 'http://localhost:8076', hs: { query: "aToken=" + token } } );

        });

        var MRB = $MR('znmt', dfd.promise);
        //TODO make dialogs with assigned controllers work again and uncomment this one
//        var errDlg = dialogService.create('error_modal', 'error-modal',
//            {
//                msg: 'Připojení k serveru není k dispozici, omlouváme se, ale doporučujeme vám obnovit stránku, pokud potíže přetrvají, neváhejte se obrátit na náš twitter nebo facebook pro podporu.',
//                btnTitle: 'Zkusit nahrát znova',
//                reload: function () {
//                    location.reload(false);
//                }
//            });
        var errDlg = dialogService.create('error_modal', '');
        MRB.connectPromise.then(function (socket) {
            //you can hook up more events here


//            socket.on('connect_failed', errDlg.open);
//            socket.on('reconnect_failed', errDlg.open);
            socket.on('disconnect', function () {
                errDlg.open();
            });
        });

        return MRB

    });

