var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
// var User = mongoose.model('User');
var Customer = mongoose.model('Customer');
var contentRange = require('content-range');

router.get('/', function(req, res, next) {
  Customer.find(function(err, customers) {
    if (err)
        res.send(err);

    res.json({customers});
  });
});

router.post('/', function(req, res, next) {
    var customer = new Customer();

    customer.nik = req.body.nik;
    customer.name = req.body.name;
    customer.email1 = req.body.email1;
    customer.email2 = req.body.email2;

    customer.save().then(function(){
      return res.json({
        nik: customer.nik,
        name: customer.name,
        email1: customer.email1,
        email2: customer.email2
      });
    }).catch(next);
});

module.exports = router;
