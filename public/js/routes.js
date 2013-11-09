(function(exports){
    var tP = '/templates/views/';

    //application routing
    exports.routes = [
        { route:'/', resolve: {templateUrl: tP + 'root.html'}},
        { route:'/navrhy', resolve: {templateUrl:tP + 'suggestions.html', reloadOnSearch: false}}

    ];

})(typeof exports === 'undefined'? this['routesModule']={}: exports);

