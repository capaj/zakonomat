String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
};
String.prototype.getBetween = function (str, str2){
    var splitted = this.split(str);
};

var routesModule = require('../public/js/routes.js');
var appRoutes = [];

routesModule.routes.forEach(function(routeDefinition){
    var prefix = routeDefinition.route.split('/:')[0];
    if (prefix.length > 1) {
        appRoutes.push(prefix)
    }
});

/**
 *
 * @param path
 * @returns {boolean} true when path is found in
 */
var pathIsValid = function(path){
    var index = appRoutes.length;
    if(path === '/'){
        return true;
    }
    while(index--) {
        if (path.startsWith(appRoutes[index])){
            return true;
        }
    }
    return false;
};

module.exports = pathIsValid;
