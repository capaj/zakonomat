app.service('userService',
    function userService($rootScope, $q, $log, facebook, $location, MRBackend) {
        var self = this;
        facebook.onLogin.register(function (token) {

            facebook.api('/me?fields=id,name,first_name,birthday,last_name,gender,link,installed,verified,picture,location,hometown')
                .then( function (me) {
                    if (me.name) {
                        self.fbAcc = me;

                    }

                });


        });

        this.getCurrentLQ = function () {

            if (self.fbAcc.id) {
                var promise = MRBackend.getModel('user').then(function (model) {
                    return model.liveQuery({where: 'fb.id', equals: self.fbAcc.id});
                });

                return promise;
            }

        };

        return this;

    });
