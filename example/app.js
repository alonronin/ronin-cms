var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    http = require('http'),
    ronin = require('../lib');

var app = express();

ronin.express = express;
ronin.mongoose = mongoose;

app.use(ronin());

mongoose.connect('mongodb://localhost/ronin-cms-example');

http.createServer(app).listen(8080);




