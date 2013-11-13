(function(exports){
    var tP = '/templates/views/';

    //application routing
    exports.routes = [
        { route:'/', resolve: {templateUrl: tP + 'root.html'}},
        { route:'/404', resolve: {templateUrl: tP + '404.html'}},
        { route:'/kontakt', resolve: {templateUrl: tP + 'contact.html'}},
        { route:'/jaktofunguje', resolve: {templateUrl: tP + 'how_it_works.html'}},
        { route:'/login', resolve: {templateUrl: '/templates/login.html'}},
        { route:'/navrhy', resolve: {templateUrl:tP + 'novels.html', reloadOnSearch: false}},
        { route:'/hlasy', resolve: {templateUrl:tP + 'votes.html', reloadOnSearch: false}},
        { route:'/navrh:navrhId', resolve: {templateUrl:tP + 'novel.html', reloadOnSearch: false}}

    ];

})(typeof exports === 'undefined'? this['routesModule']={}: exports);

