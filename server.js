var http = require('http');
http.globalAgent.maxSockets = 100;
http.Agent.maxSockets = 100;
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var pjson = require('./package.json');

//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV = pjson.env || 'dev';
var envSettings = require('./server/' + env);
var express = require('express');
var pathChecker = require('./server/pathChecker.js');
var app = module.exports = express();
var fs = require('fs');
var moonridge = require('moonridge');

mongoose.connect(envSettings.mongoConn, function (err) {
    // if we failed to connect, abort
    if (err) {
        throw err;
    } else {
        console.log("DB connected succesfully");
    }

});

mongoose.connection.on('error', function (err) {
    console.error(err);
});
var MR = moonridge.init(mongoose);

var domain = require('./models')(MR);


app.configure(function(){
    app.set('port', process.env.PORT || pjson.port);
    app.set('showStackError', true);

    //Should be placed before express.static
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    //Setting the fav icon and static folder
    app.use(express.favicon());
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(app.router);
    if (env == 'production') {
        app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:3000/'));

        process.on('uncaughtException', function(err) {
            console.log(err);
        });
    }
});

var server = app.listen(app.get('port'), function () {

	var io = require('socket.io').listen(server);
	io.configure(function (){
		io.set('authorization', require('./server/authorization')(domain.user.model, io));

        if (env === 'production') {

            io.enable('browser client etag');          // apply etag caching logic based on version number

//            io.set('log level', 1);                    // reduce logging    // TODO set to 1 for real production

            io.set('transports', [
                'websocket'
                ,'flashsocket'
                , 'htmlfile'
                , 'xhr-polling'
                , 'jsonp-polling'
            ]);
        }
    });

	moonridge.createServer(io, app);

	app.get('*', function(req, res){
        var pathName = req._parsedUrl.pathname;
        var filePath = './public' + pathName;
        fs.exists(filePath, function (exists)
        {
            if(exists)
            {
                res.sendfile(filePath);
            } else {
                if(pathChecker(pathName)){
                    res.sendfile('./public/index.html');
                } else {
                    res.status(404);
                    res.sendfile('./public/index.html');
                }
            }

        });

    });
    console.info("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



