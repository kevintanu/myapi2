var express = require('express');
var router = express.Router();

router.use('/', require('./users'));
router.use('/customers', require('./customers'));

module.exports = router;
