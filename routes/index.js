const express = require('express');
const log = require('debug')("subheaven:index")
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    log(`Index page requested.`);
    res.render('index', { title: 'Express' });
});

module.exports = router;