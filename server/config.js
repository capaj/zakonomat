var _ = require('lodash');

// Load app configuration

module.exports = _.extend(
    require(__dirname + '/../config/all.js'),
    require(__dirname + '/../config/' + process.env.NODE_ENV + '.json') || {});
