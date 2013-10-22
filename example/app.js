var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    http = require('http'),
    ronin = require('../lib');

var app = express();

ronin.express = express;
ronin.mongoose = mongoose;

app.get('/users', function(req, res){
    ronin.cms.models.users.find().exec(function(err, result){
        res.json(result);
    })
});

app.use(ronin());

var schema = new mongoose.Schema({
    name: String,
    email: String
});

ronin.cms.models.users = mongoose.model('users', schema);

mongoose.connect('mongodb://localhost/ronin-cms-example');

http.createServer(app).listen(8080);




