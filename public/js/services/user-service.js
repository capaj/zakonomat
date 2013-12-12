app.service('userService',
    function userService($rootScope, $q, $log, facebook, $location, MRBackend) {
        var self = this;
        var dfd = $q.defer();
		var userModelPromise = MRBackend.getModel('user');
        this.loginPromise = dfd.promise;
        facebook.onLogin.register(function (token) {

            facebook.api('/me?fields=id,name,first_name,birthday,last_name,gender,link,installed,verified,picture,location,hometown')
                .then( function (me) {
                    if (me.name) {
                        self.fbAcc = me;
						userModelPromise.then(function (userModel) {
							var LQ = userModel.liveQuery().where('fb.id').equals(me.id).exec();
							LQ.promise.then(function (LQ) {
								self.profile = LQ.docs[0];
								if (LQ.docs[0]) {
									dfd.resolve(self.profile);
								} else {
									debugger; //should always return a profile
								}
							});
						})

                    }

                });


        });

        this.getCurrentLQ = function () {
            return self.loginPromise.then(function (me) {
                var promise = userModelPromise.then(function (model) {
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
