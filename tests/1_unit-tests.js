const chai = require('chai');
const { test } = require('mocha');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  suite('Function convertHandler.getNum()', function () {
    test('Whole number input', (done) => {
      let input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test('Decimal Input', (done) => {
      let input = '3.2L';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });

    test('Fractional Input', (done) => {
      let input = '3/2L';
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });

    test('Fractional Input with Decimal', (done) => {
      let input = '3.2/2L';
      assert.equal(convertHandler.getNum(input), 1.6);
      done();
    });

    test('Invalid Input (double fraction)', (done) => {
      let input = '3/2/2L';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });

    test('No Numerical Input', (done) => {
      let input = 'L';
      assert.equal(convertHandler.getNum(input), '1');
      done();
    });
  });

  suite('Function convertHandler.getUnit()', () => {
    test('For Each Valid Unit Input', (done) => {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      input.forEach((unit) => {
        assert.equal(convertHandler.getUnit(unit), unit);
      });
      done();
    });

    test('No Unit Input', (done) => {
      let input = '32';
      assert.equal(convertHandler.getUnit(input), 'invalid unit');
      done();
    });
  });

  suite('Function convertHandler.getReturnUnit()', () => {
    test('For Each Valid Unit Input', (done) => {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];

      input.forEach((unit, i) => {
        assert.equal(convertHandler.getReturnUnit(unit), expect[i]);
      });

      done();
    });
  });

  suite('Function convertHandler.spellOutUnit()', () => {
    test('For Each Valid Unit Input', (done) => {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expect = [
        'gallons',
        'liters',
        'miles',
        'kilometers',
        'pounds',
        'kilograms',
      ];

      input.forEach((input, i) => {
        assert.equal(convertHandler.spellOutUnit(input), expect[i]);
      });

      done();
    });
  });

  suite('Function convertHandler.convert()', () => {
    test('Gallons to Liters', (done) => {
      let input = { initNum: 32, initUnit: 'gal' };

      assert.approximately(
        convertHandler.convert(input.initNum, input.initUnit),
        121.1,
        0.1
      );

      done();
    });

    test('Liters to Gallons', (done) => {
      let input = { initNum: 32, initUnit: 'L' };

      assert.approximately(
        convertHandler.convert(input.initNum, input.initUnit),
        8.5,
        0.1
      );

      done();
    });

    test('Miles to Kilometers', (done) => {
      let input = { initNum: 32, initUnit: 'mi' };

      assert.approximately(
        convertHandler.convert(input.initNum, input.initUnit),
        51.5,
        0.1
      );

      done();
    });

    test('Kilometers to Miles', (done) => {
      let input = { initNum: 32, initUnit: 'km' };

      assert.approximately(
        convertHandler.convert(input.initNum, input.initUnit),
        19.9,
        0.1
      );

      done();
    });

    test('Pounds to Kilograms', (done) => {
      let input = { initNum: 32, initUnit: 'lbs' };

      assert.approximately(
        convertHandler.convert(input.initNum, input.initUnit),
        14.5,
        0.1
      );

      done();
    });

    test('Kilograms to Pounds', (done) => {
      let input = { initNum: 32, initUnit: 'kg' };

      assert.approximately(
        convertHandler.convert(input.initNum, input.initUnit),
        70.5,
        0.1
      );

      done();
    });
  });
});
