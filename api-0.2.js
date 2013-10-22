var Ronin = require('ronin');

var ronin = Ronin({
    port: 80,
    views: __dirname + '/views',
    run: false
});

ronin.use(require('ronin-gallery'));
ronin.use(require('ronin-blog'));
ronin.use(require('ronin-contact'));

ronin.use(require('ronin-api'));

// express app
var app = ronin.app;

app.get('/special', function(req, res) { res.send('No'); });

// models
var schema = ronin.models.config;

// helpers and filters
ronin.filters.filterName = function(val) { return val };
ronin.helpers.helperName = function(chunk, ctx, bodies, params) { return chunk; };

ronin.run();

/*
    Navigation
 */

var nav = {
    title: String,
//    slug: String,
//    parent: ObjectId,
    type: { type: String, enum: ronin.modules }
};

var nav1 = ['About', 'page'];
var nav3 = ['Blog', 'blog'];

/*
    Blog Module
 */

var blogs = {
    nav: { type: ObjectId, ref: 'nav' },
    posts_per_page: Boolean,
    comments: Boolean
};

var posts = {
    nav: { type: ObjectId, ref: 'nav' }, // nav will always be a blog-nav
    title: String,
    tags: [String],
    date: Date,
    content: String,
    show: Boolean
};

ronin.register('blog', blogs);
ronin.register('posts', posts, {
    parent: 'blog' // posts can only be children of blog
});

/*

About
Blog
    post
    post
    post
Blog2
    post
    post
    post

 */

/*
    Grape-man
 */

var index = {
    filters: [String],
    sorters: [String],
    items: [{
        title: String,
        params: [{
            name: String,
            value: String
        }]
    }]
};

ronin.register('index', 'index');
