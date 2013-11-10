app.factory('RPCBackend', function RPCBackend ($rpc, $window) {
    $rpc.connect($window.RPCbackendURL);
    return $rpc;
});
