app.service('userService',
    function userService($rootScope, $q, $log, facebook, $location, MRBackend) {
        var self = this;
        var dfd = $q.defer();
        this.loginPromise = dfd.promise;
        facebook.onLogin.register(function (token) {

            facebook.api('/me?fields=id,name,first_name,birthday,last_name,gender,link,installed,verified,picture,location,hometown')
                .then( function (me) {
                    if (me.name) {
                        self.fbAcc = me;
                        dfd.resolve(me);
                    }

                });


        });

        this.getCurrentLQ = function () {
            return self.loginPromise.then(function (me) {
                var promise = MRBackend.getModel('user').then(function (model) {
                    return model.liveQuery({where: 'fb.id', equals: me.id});
                });

                return promise;
            });

        };

		this.logout = function () {
			facebook.logout().then(function () {
				delete self.fbAcc;
				$location.url('/');
			});
		};

        return this;

    });
