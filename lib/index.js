var Ronin = require('./ronin');

var ronin = module.exports = function(options) {
    if (ronin.cms)
        return cms.app;

    var cms = ronin.cms = new Ronin({
        express: ronin.express,
        mongoose: ronin.mongoose
    }, options);

    cms.app.on('mount', function() {
        cms.path = cms.app.route;
    });

    return cms.app;
};