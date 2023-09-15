'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

Number.prototype.roundTo = function (decimalPlaces) {
  const factor = 10 ** decimalPlaces;
  return Math.round(this * factor) / factor;
};

module.exports = function(app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    console.log(initNum)
    const initUnit = convertHandler.getUnit(input);
    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      res.send('invalid number and unit')
    } else if (initNum == 'invalid number') {
      res.send('invalid number')
    } else if (initUnit == 'invalid unit') {
      res.send('invalid unit');
    } else {
      const returnNum = convertHandler.convert(initNum, initUnit).roundTo(5);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      res.send({ initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: string })
    }
  })


};
