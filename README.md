Ronin CMS
=====

>An [Express] middleware to create a CMS based on [mongoose] models, [dust] template engine and [formage] as a backend.

### Install

```
npm install ronin
```

### Usage

```js
var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    ronin = require('../lib');

// express app
var app = express();

// configure ronin
ronin.express = express;
ronin.mongoose = mongoose; // mongoose Instance
ronin.admin = { 
    path: '/admin', // admin path
    user: 'admin' // username
    password: 'admin' // password
}

// initialize ronin CMS
app.use(ronin());

// connect to database
mongoose.connect('mongodb://localhost/ronin');

// start http server with express app
http.createServer(app).listen(8080);
```

### Themes (or Templates)

configure the theme folder. if it has a default folder, this theme will be selected.

```js
var path = require('path');

// Teheme Folder
ronin.cms.themesFolder = path.join(__dirname, 'themes');

// Current Theme
ronin.cms.theme = ronin.cms.themes.my_theme;
```

### Assigning models to template

template is a file inside a theme root folder. a template is assigned to a page in navigation model.

```js
ronin.cms.themes.my_theme.about.models = ['content', 'gallery'];
```

### Ronin Middlewares

default middlewares are: config, page, crumbs and post.
adding custom middleware to the `ronin.middlewares` object:
```js
ronin.cms.middlewares.gallery = function(req, res, next){
    var locals = res.locals;
    
    if(req.query.gallery){
        ronin.cms.models
            .gallery
            .findById(req.query.gallery, function(err, result){
                locals.crumbs.push({title: result.title, url: locals.page.url + '?gallery=' + result._id});
                locals.gallery = result;
                next();
            })
    } else next();
};
```

all default middlewares are in res.locals: `res.locals.page`, `res.locals.crumbs`, etc.

### Custom Models

```js
var schema = mongoose.Schema({
    title: String,
    author: String,
    text: String,
    date: Date
})

var model = mongoose.model('blogpost', schema);

ronin.cms.models.blogpost = model;
```

### Adding paths to a pre-defined Schema/model
```js
ronin.cms.models.config.add({ site: { name: String, email: String}, copyrights: String, date: Date }
```

### Custom Filters

```js
ronin.cms.filters.t = function(value) {
    return /^\s+|\s+$/g.replace(value);
}
```
use it in a dust template:
```html
<p>{title|t}</p>
```

### Custom Helpers
```js
ronin.cms.helpers.truncate = function(chunk, context, bodies, params) {
    return chunk.tap(function(data) {
        var arr = data.split(' ');
        arr.length = params.length;
        return arr.join(' ') + '...';
    }).render(bodies.block, context).untap();
}
```
use it in a dust template:
```html
<p>
    {@truncate length=10}
    Lorem ipsum dolor sit amet, ius id fierent recteque sententiae, cum at solum utroque. No debet saperet est, te mutat inani possim mel. Mea ne fugit contentiones, duo an aliquid admodum nominati. Eum alia vocibus cu, et vix alia abhorreant.
    {/truncate}
</p>
```
output:
```html
<p>
    Lorem ipsum dolor sit amet, ius id fierent recteque sententiae...
</p>
```

[Express]: http://www.expressjs.com
[mongoose]: http://www.mongoosejs.com
[dust]: http://linkedin.github.io/dustjs
[formage]: https://github.com/Empeeric/formage
