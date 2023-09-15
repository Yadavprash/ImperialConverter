const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('read a whole number input',function(){
    assert.strictEqual(convertHandler.getNum('3.2mi'),3.2);
     assert.strictEqual(convertHandler.getNum('0.7kg'),0.7);
     assert.strictEqual(convertHandler.getNum('100.56gal'),100.56);
     assert.strictEqual(convertHandler.getNum('-10.56'),'invalid number');
    assert.strictEqual(convertHandler.getNum('10kg45'),'invalid number');
  })
  test('read a decimal number input',function(){
     assert.strictEqual(convertHandler.getNum('3.2mi'),3.2);
     assert.strictEqual(convertHandler.getNum('0.7kg'),0.7);
     assert.strictEqual(convertHandler.getNum('100.56gal'),100.56);
     assert.strictEqual(convertHandler.getNum('-10.56'),'invalid number');
  })
  test('read a fractional input',function(){
    assert.strictEqual(convertHandler.getNum('3/2mi'),3/2);
     assert.strictEqual(convertHandler.getNum('0/7kg'),0/7);
     assert.strictEqual(convertHandler.getNum('100/56gal'),100/56);
     assert.strictEqual(convertHandler.getNum('45/0mi'),'invalid number');
  })
  test('read a fractional input with decimal',function(){
    assert.strictEqual(convertHandler.getNum('3.5/2mi'),3.5/2);
     assert.strictEqual(convertHandler.getNum('0.5/7kg'),0.5/7);
     assert.strictEqual(convertHandler.getNum('100.2/56gal'),100.2/56);
     assert.strictEqual(convertHandler.getNum('45.5/0mi'),'invalid number');
  })
  test('return an error on a double-fraction',function(){
    assert.strictEqual(convertHandler.getNum('3/2/3gal'),'invalid number');
  })
  test('default to a numerical input of 1 when no numerical input is provided',function(){
    assert.strictEqual(convertHandler.getNum('gal'),1);
  })

  test('read input unit',function(){
    assert.strictEqual(convertHandler.getUnit('45gal'), 'gal');
      assert.strictEqual(convertHandler.getUnit('4/5L'), 'L');
      assert.strictEqual(convertHandler.getUnit('4.5/6mi'), 'mi');
      assert.strictEqual(convertHandler.getUnit('km'), 'km');
      assert.strictEqual(convertHandler.getUnit('6lbs'), 'lbs');
      assert.strictEqual(convertHandler.getUnit('0kg'), 'kg');
  })
  test('return error on invalid unit',function(){
    assert.strictEqual(convertHandler.getUnit('abc'), 'invalid unit');
     assert.strictEqual(convertHandler.getUnit(' '), 'invalid unit');
     assert.strictEqual(convertHandler.getUnit('a90'), 'invalid unit');
  })
  test(' correct return unit for each valid input unit',function(){
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
    assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
  })
  test(' return the spelled-out string unit for each valid input unit',function(){
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
  })

  test('correctly convert gal to L',function(){
    assert.equal(convertHandler.convert(1,'gal').toFixed(5),3.78541);
    assert.equal(convertHandler.convert(3,'gal').toFixed(5),11.35623);
  })
  test('correctly convert L to gal',function(){
    assert.equal(convertHandler.convert(1,'L').toFixed(5),0.26417 );
    assert.equal(convertHandler.convert(34,'L').toFixed(5),8.98185);
  })

  test('correctly convert mi to km',function(){
    assert.equal(convertHandler.convert(1,'mi').toFixed(5),1.60934);
    assert.equal(convertHandler.convert(50,'mi').toFixed(5),80.46700 );
  })
  test('correctly convert km to mi',function(){
    assert.equal(convertHandler.convert(1,'km').toFixed(5), 0.62137);
    assert.equal(convertHandler.convert(69,'km').toFixed(5),42.87472);
  })
  test('correctly convert lbs to kg',function(){
    assert.equal(convertHandler.convert(1,'lbs').toFixed(5),0.45359 );
    assert.equal(convertHandler.convert(90,'lbs').toFixed(5),40.82328);
  })
  test('correctly convert kg to lbs',function(){
    assert.equal(convertHandler.convert(1,'kg').toFixed(5),2.20462);
    assert.equal(convertHandler.convert(55,'kg').toFixed(5),121.25434);
  })
});