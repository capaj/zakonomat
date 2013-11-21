(function(exports){
    var tV = '/templates/views/';
    var tS = '/templates/static/';

    //application routing
    exports.routes = [
        { route:'/', resolve: {templateUrl: tV + 'root.html'}},
        { route:'/404', resolve: {templateUrl: tS + '404.html'}},
        { route:'/kontakt', resolve: {templateUrl: tV + 'contact.html'}},
        { route:'/jaktofunguje', resolve: {templateUrl: tV + 'how_it_works.html'}},
        { route:'/kodex', resolve: {templateUrl: tV + 'kodex.html'}},
        { route:'/tym', resolve: {templateUrl: tV + 'tym.html'}},
        { route:'/podporujinas', resolve: {templateUrl: tV + 'supporting_us.html'}},
        { route:'/financovani', resolve: {templateUrl: tV + 'financing.html'}},
        { route:'/board', resolve: {templateUrl: tV + 'expert_board.html'}},
        { route:'/login', resolve: {templateUrl: '/templates/login.html'}},
        { route:'/registrace', resolve: {templateUrl: '/templates/register.html'}},
        { route:'/profil', resolve: {templateUrl: tV + 'profil.html', reloadOnSearch: false}},
        { route:'/navrhy', resolve: {templateUrl:tV + 'novels.html', reloadOnSearch: false}},
		{ route:'/navrh:novelId', resolve: {templateUrl:tV + 'novel.html', reloadOnSearch: false}},
        { route:'/uzivatele', resolve: {templateUrl:tV + 'novels.html', reloadOnSearch: false}},
		{ route:'/uzivatel:userId', resolve: {templateUrl:tV + 'novel.html', reloadOnSearch: false}},
		{ route:'/hlasy', resolve: {templateUrl:tV + 'votes.html', reloadOnSearch: false}},
        { route:'/hlas:novelVoteId', resolve: {templateUrl:tV + 'vote.html', reloadOnSearch: false}}

    ];

})(typeof exports === 'undefined'? this['routesModule']={}: exports);

