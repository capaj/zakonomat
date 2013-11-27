app.factory('RPCBackend', function RPCBackend ($rpc, $window) {
    $rpc.connect($window.RPCbackendURL);
    return $rpc;
}).factory('MRBackend', function MRBackend($rootScope, $q, $log, facebook, $location, $MR) {

        var dfd = $q.defer();
        facebook.onLogin.register(function (token) {

            dfd.resolve({url: 'http://dem2.cz:8076', hs: { query: "aToken=" + token } } );
//            dfd.resolve({url: 'http://localhost:8088', hs: { query: "aToken=" + token } } );

        });

        return $MR('znmt', dfd.promise);

    });

