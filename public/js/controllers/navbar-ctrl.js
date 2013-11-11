app.controller('navbarCtrl', function ($scope, $rootScope, facebook) {
    facebook.onLogin.register(function () {
        facebook.api('/me?fields=id,name,first_name,last_name,gender,link,installed,verified,picture,location,hometown')
            .then( function (me) {
            if (me.name) {
                document.getElementById('auth-displayname').innerHTML = me.name;
                $rootScope.fbAcc = me;



            }

        });

    })

});