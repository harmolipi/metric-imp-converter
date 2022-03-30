function ConvertHandler() {
  const matchUnit = /[a-zA-Z]+/;

  this.getNum = function (input) {
    let result = input.slice(0, input.search(matchUnit));

    if (result === '') {
      result = 1;
    } else if (
      !result.includes('/') ||
      result.match(/\//g).length === 1 ||
      result.match(/\//g).length === 0
    ) {
      result = eval(result);
    } else {
      result = 'invalid number';
    }

    return result;
  };

  this.getUnit = function (input) {
    const validUnits = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const unitIndex = input.search(matchUnit);

    let result = input.slice(unitIndex);
    result = result.toLowerCase() === 'l' ? 'L' : result.toLowerCase();

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

    result = Math.round(result * 100000) / 100000;
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
