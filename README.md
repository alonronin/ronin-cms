Ronin CMS
=====

>An Express middleware to create a CMS based on mongoose models, dust template engine and formage as a backend.

### Install

```
npm install ronin
```

### Useage

```js
var http = require('http'),
    express = require('express'),
    mongoose = require('mongoose'),
    ronin = require('../lib');

// express app
var app = express();

// configure ronin
ronin.mongoose = mongoose, // Mongoose Instance
ronin.db = 'mongodb://localhost/ronin' // DB Connection String

// initialize ronin CMS
app.use(ronin.middleware);

// start http server with express app
http.createServer(app).listen(8080);
```

### Custom models

```js
var model = mongoose.Schema({
    title: String,
    author: String,
    text: String,
    date: Date
})

var blogPost = mongoose.model('blogpost', model);

ronin.models.add(blogPost);
```

### Custom filters

```js
ronin.filters.t = function(value){
    return /^\s+|\s+$/g.replace(value);
}
```

use in in dust template:

```html
<p>{title|t}</p>
```



