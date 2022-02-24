var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Savings Calcuator',
    selectProvinceLabel: 'Select a province',
    provinceList: [
      {
        name: "Ontario",
        locationFlag: "on"
      },
      {
        name: "Manitoba",
        locationFlag: "mb"
      }
    ],
    gasTankLabel: 'How many tanks of gas per week?',
    washLable: 'How many car washes per week do you purchase along with gas?',
    washTypeLable: 'What type of car wash do you purchase?',
    washList: [
      {
        name: "-----",
        washType: ""
      },
      {
        name: "Basic",
        washType: "basic"
      },
      {
        name: "Deluxe",
        washType: "deluxe"
      },
      {
        name: "Ultimate",
        washType: "ultimate"
      }
    ],
    sundriesLabel:'How much do you spend in-store per week?'
  });
});

module.exports = router;
