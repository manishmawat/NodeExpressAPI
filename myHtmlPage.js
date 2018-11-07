const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index', {title: 'My html page from pug engine', message: 'My message from the pug object item'});
});

module.exports = router;