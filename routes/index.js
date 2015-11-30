var express = require('express');
var router = express.Router();

// invoked before each action
router.all('*', function(req, res, next) {
    // set locale
    var rxLocal = /^\/(tr|en)/i;
    if(rxLocal.test(req.url)){
        var arr = rxLocal.exec(req.url);
        var local=arr[1];
        res.setLocale(local);
    } else {
        res.setLocale('tr');
    }
    // add extra logic
    next();
});


router.get('/keywords', function(req, res) {
    var collection = req.db.getCollection('test'); // collection
    collection.find({},{},function(e,docs){
        res.json(docs);
    });

    res.render('index', {
        title: res.__('Express'),
        welcome: res.__("Welcome")
    });
});


/* home page */
router.get('/', function(req, res) {
    //res.setLocale('tr');
    res.render('index', {
        title: res.__('Express'),
        welcome: res.__("Welcome"),
        basicInfo: res.__("basicInfo")
    });
});
router.get('/en', function(req, res){
    //res.setLocale('en');
    res.render('index', {
        title: res.__('Express'),
        welcome: res.__("Welcome"),
        basicInfo: res.__("basicInfo")
    });
});

/* search */
router.get('/arama', function(req, res) {
    res.setLocale('tr');
    res.render('search', {title: res.__('Express'), welcome: res.__("Welcome")});
});
router.get('/search', function(req, res){
    //res.setLocale('en');
    res.render('search', { title: res.__('Express'), welcome: res.__("Welcome") });
});

module.exports = router;
