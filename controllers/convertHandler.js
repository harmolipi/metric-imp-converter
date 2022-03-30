function ConvertHandler() {
  this.getNum = function (input) {
    const matchNumber = /^[0-9]+/;
    let result = input.match(matchNumber)[0];
    return result;
  };

  this.getUnit = function (input) {
    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const matchUnit = /[a-zA-Z]+/;
    let result = input.toLowerCase().match(matchUnit)[0];
    result = result === 'l' ? 'L' : result;

    if (validUnits.includes(result)) {
      return result;
    } else {
      return 'invalid unit';
    }
  };

  this.getReturnUnit = function (initUnit) {
    const unitPairings = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs',
    };

    let result = unitPairings[initUnit];
    return result;
  };

  this.spellOutUnit = function (unit) {
    const longUnits = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms',
    };

    let result = longUnits[unit];
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === 'gal') {
      result = initNum * galToL;
    } else if (initUnit === 'L') {
      result = initNum / galToL;
    } else if (initUnit === 'lbs') {
      result = initNum * lbsToKg;
    } else if (initUnit === 'kg') {
      result = initNum / lbsToKg;
    } else if (initUnit === 'mi') {
      result = initNum * miToKm;
    } else if (initUnit === 'km') {
      result = initNum / miToKm;
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };
}

module.exports = ConvertHandler;
