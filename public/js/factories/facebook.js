app.factory('facebook', function ($window, $rootScope, SingleEvent, $q) {

    // Load the SDK Asynchronously
    (function (d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement('script'); js.id = id; js.async = true;
        js.src = "//connect.facebook.net/cs_CZ/all.js";
        ref.parentNode.insertBefore(js, ref);
    }(document));


    var onLogin = new SingleEvent();
    var onLogout = new SingleEvent();

    //just FB api wrapped in promise
    var api = function () {
        var dfd = $q.defer();
        Array.prototype.push.call(arguments, function (res) {
            if (res.error) {
                dfd.reject(res);
            } else {
                dfd.resolve(res);
            }
            $rootScope.$apply();
        });
        FB.api.apply(this, arguments);
        return dfd.promise;
    };

    $window.fbAsyncInit = function () {
        FB.init({
            appId: '152010184924545', // Dem2.cz App ID
            //channelUrl : '//'+window.location.hostname+'/channel', // Path to your Channel File
            status: true, // check login status
            cookie: true, // enable cookies to allow the server to access the session
            xfbml: true,  // parse XFBML,
            oauth: true,
            frictionlessRequests: true
        });

        FB.getLoginStatus(function(response) {
            if (response.status === "unknown") {
                //connect anonymous user, Facebook is not authorized
                console.log("connect anonymous user, Facebook is not authorized");
                var at = 'ANON';
                onLogin.fire(at);
                facebook.aToken = at;   //anonymous user

            }
        }, true);

        // listen for and handle auth.statusChange events
        FB.Event.subscribe('auth.statusChange', function (res) {
            if (res.status === 'connected') {
                onLogin.fire(res.authResponse.accessToken);
                facebook.aToken = res.authResponse.accessToken;

            } else if (res.status === 'not_authorized') {

//                    FB.login();
            } else {

//                    FB.login();
            }

            $rootScope.$apply();

        });

    };


//	var promisify = function (fn) {
//		return function () {
//			var dfd = $q.defer();
//			fn(function (res) {
//				dfd.resolve(res);
//			});
//			return dfd.promise;
//		}
//	};

    var logout = function () {
		var dfd = $q.defer();

		FB.logout(function (res) {
            onLogout.fire(facebook.aToken);
            delete facebook.aToken;
            dfd.resolve(res);

            $rootScope.$apply();
		});
		return dfd.promise;

	};

	var login = function () {
        var loginDfd = $q.defer();

        FB.login(function (res) {
            loginDfd.resolve(res);

        }, {scope: 'publish_actions,publish_stream,email,user_birthday'});

	    return loginDfd.promise;
	};

	var facebook = {onLogin: onLogin, onLogout: onLogout, api: api, login: login, logout: logout};
    return facebook;
});