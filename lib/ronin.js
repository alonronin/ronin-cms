var mongoose,
    express;

var Ronin = module.exports = function(dep, options) {
    mongoose = dep.mongoose;
    express = dep.express;

    this.middlewares = {};
    this.models = {};
    this.filters = {};
    this.helpers = {};
    this.init();
};

Ronin.prototype.init = function() {
    var cms = this,
        app = this.app = new express();


    app.get('*', function(req, res, next) {
        res.json(app.routes);
    });


};