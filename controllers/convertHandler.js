function ConvertHandler() {

  const validUnits = ['gal', 'mi', 'lbs', 'L', 'km', 'kg'];
  const spellUnits = ['gallons', 'miles', 'pounds', 'liters', 'kilometers', 'kilograms'];

  this.getNum = function(input) {
    if (!input) return "invalid number";
    if( input[0] == '-') return 'invalid number';
        const symbolRegex = /[,!?\-\[\]{}()"':;<>~@#$%^&*_=]/g;
        const regex =/^[0-9]+(?:\.[0-9]+)?(?:\/([0-9]+(?:\.[0-9]+)?))?(?:[a-zA-Z]+)?$/;
        const alphRegex = /^([a-zA-Z]+)$/;
    try{
      const match = input.match(regex);
      const denominator = parseFloat(match[1]);
      if(denominator == 0) return 'invalid number';
      console.log(match);
      if(!match) return 'invalid number';
      if(denominator){
        return parseFloat(match[0]) / denominator ;
      }
      return parseFloat(match[0]);
    }catch(err){
      if(alphRegex.test(input)) return 1;
      return 'invalid number'
    }
    // return 1;
  };

  this.getUnit = function(input) {
    if (!input) return "invalid unit";
    const match = input.match(/([a-zA-Z]+)/);
    try{
      let unit = match[1];
      if (match[1] != 'L') {
        unit = unit.toLowerCase();
      }
      if(match[1] == 'l'){
        unit = unit.toUpperCase();
      }
      if (!validUnits.includes(unit)) {
        return 'invalid unit';
      }
      return unit;
    }catch(err){
      return 'invalid unit';
    }
  };

  this.getReturnUnit = function(initUnit) {
    if (initUnit == 'invalid unit') return initUnit
    const index = validUnits.indexOf(initUnit)
    const indexOfReturnUnit = (index + 3) % 6;
    return validUnits[indexOfReturnUnit];
  };

  this.spellOutUnit = function(unit) {
    if (unit == 'invalid unit') return unit;
    const index = validUnits.indexOf(unit)
    return spellUnits[index];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const Ltogal = 0.264172;
    if (initUnit == 'gal') {
      return initNum * galToL;
    } else if (initUnit == 'lbs') {
      return initNum * lbsToKg;
    } else if (initUnit == 'mi') {
      return initNum * miToKm;
    } else if (initUnit == 'L') {
      return initNum * Ltogal;
    } else if (initUnit == 'kg') {
      return initNum / lbsToKg;
    } else {
      return initNum / miToKm;
    }

  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
