var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Fuel Savings Calculator',
    selectProvinceLabel: 'Select a province.',
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
    washLable: 'How many car washes per week do you purchase?',
    washTypeLable: 'What type of car wash do you purchase?',
    washList: [
      {
        name: "Bronze",
        washType: "bronze"
      },
      {
        name: "Silver",
        washType: "silver"
      },
      {
        name: "Gold",
        washType: "gold"
      }
    ],
    sundriesLabel:'How much do you spend in-store per week?'
  });
});

module.exports = router;
