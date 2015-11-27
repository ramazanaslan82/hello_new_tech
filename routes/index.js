var express = require('express');
var router = express.Router();

// invoked before each action
router.all('*', function(req, res, next) {
    // set locale
    var rxLocal = /^\/(de|en)/i;
    if(rxLocal.test(req.url)){
        var arr = rxLocal.exec(req.url);
        var local=arr[1];
        res.setLocale(local);
    } else {
        res.setLocale('de');
    }
    // add extra logic
    next();
});



/* home page */
router.get('/', function(req, res) {
    res.setLocale('tr');
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
