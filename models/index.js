module.exports = function loadModels(MR) {
    require('./user')(MR);
    require('./fb-account')(MR);
    require('./novel')(MR);
    require('./vote')(MR);
    require('./comment')(MR);

};
