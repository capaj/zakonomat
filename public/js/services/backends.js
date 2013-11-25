app.factory('RPCBackend', function RPCBackend ($rpc, $window) {
    $rpc.connect($window.RPCbackendURL);
    return $rpc;
}).factory('MRBackend', function MRBackend($rootScope, $q, $log, facebook, $location, $MR) {

        var dfd = $q.defer();
        facebook.onLogin.register(function (token) {

            dfd.resolve({url: 'http://localhost:8080', hs: { query: "aToken=" + token } } );

        });

        return $MR('local', dfd.promise);

    });
