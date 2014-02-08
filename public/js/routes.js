(function(exports){
    var tV = '/templates/views/';
    var tS = '/templates/static/';

    //application routing
    exports.routes = [
        { route:'/', resolve: {templateUrl: tV + 'root.html'}},
        { route:'/404', resolve: {templateUrl: tS + '404.html'}},
        { route:'/kontakt', resolve: {templateUrl: tS + 'contact.html'}},
        { route:'/jaktofunguje', resolve: {templateUrl: tS + 'how_it_works.html'}},
        { route:'/kodex', resolve: {templateUrl: tV + 'kodex.html'}},
        { route:'/tym', resolve: {templateUrl: tS + 'team.html'}},
        { route:'/podporujinas', resolve: {templateUrl: tS + 'supporting_us.html'}},
        { route:'/financovani', resolve: {templateUrl: tV + 'financing.html'}},
        { route:'/board', resolve: {templateUrl: tS + 'board.html'}},
        { route:'/faq', resolve: {templateUrl: tS + 'faq.html'}},
        { route:'/registrace', resolve: {templateUrl: tS + 'register.html'}},
        { route:'/profil', resolve: {templateUrl: tV + 'profile.html', reloadOnSearch: false}},
        { route:'/navrhy', resolve: {templateUrl:tV + 'novels.html', reloadOnSearch: false}},
		{ route:'/navrh', resolve: {templateUrl:tV + 'novel_detail.html', reloadOnSearch: false}},
		{ route:'/novyNavrh', resolve: {templateUrl:tV + 'novel_edit.html', reloadOnSearch: false}},
        { route:'/uzivatele', resolve: {templateUrl:tV + 'users.html', reloadOnSearch: false}},
		{ route:'/uzivatel', resolve: {templateUrl:tV + 'user_detail.html', reloadOnSearch: false}},
		{ route:'/hlasy', resolve: {templateUrl:tV + 'votes.html', reloadOnSearch: false}},
        { route:'/hlas', resolve: {templateUrl:tV + 'vote_detail.html', reloadOnSearch: false}},
        { route:'/komentare', resolve: {templateUrl:tV + 'comments.html', reloadOnSearch: false}}

    ];

})(typeof exports === 'undefined'? this['routesModule']={}: exports);

