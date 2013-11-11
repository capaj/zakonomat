app.factory('SingleEvent', function () {
    /**
     * creates an object with 3 methods: register, fire, unregister
     * @constructor
     */
    var Event = function Event() {
        var self = this;
        var listeners = [];
        this.register = function (fn) {
            return listeners.push(fn) - 1;
        };
        this.listeners = [];
        this.fire = function () {
            var i = listeners.length;
            while(i--){
                listeners[i]()
            }
        };
        this.unregister = function (index) {
            listeners.splice(index, 1);
        };
    };
    return Event;
});

