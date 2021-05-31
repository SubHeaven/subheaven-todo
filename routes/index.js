const express = require('express');
const log = require('debug')("subheaven:index")
const path = require('path');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    log(`Index page requested.`);
    let page_path = path.resolve(__dirname, '..', 'front', 'html', 'todo.html');
    // let page_path = path.resolve(__dirname, '..', 'public', 'index.html');
    log(`    ${page_path}`);
    console.log(page_path);
    res.sendFile(page_path);
});

module.exports = router;