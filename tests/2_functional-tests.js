const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { test } = require('mocha');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Convert Valid Input: "10L"', (done) => {
    let input = '10L';
    chai
      .request(server)
      .get('/api/convert')
      .query({ input })
      .end((err, res) => {
        if (err) return done(err);

        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.approximately(res.body.returnNum, 2.6, 0.1);
        assert.equal(res.body.returnUnit, 'gal');
        assert.equal(res.body.string, '10 liters converts to 2.64172 gallons');

        done();
      });
  });

  test('Convert Invalid Unit: "32g"', (done) => {
    let input = '32g';

    chai
      .request(server)
      .get('/api/convert')
      .query({ input })
      .end((err, res) => {
        if (err) return done(err);

        assert.equal(res.body, 'invalid unit');

        done();
      });
  });

  test('Convert invalid number: "3/7.2/4kg"', (done) => {
    let input = '3/7.2/4kg';

    chai
      .request(server)
      .get('/api/convert')
      .query({ input })
      .end((err, res) => {
        if (err) return done(err);

        assert.equal(res.body, 'invalid number');

        done();
      });
  });

  test('Convert Invalid Unit and Number: "3/7.2/4kilomegagram"', (done) => {
    let input = '3/7.2/4kilomegagram';

    chai
      .request(server)
      .get('/api/convert')
      .query({ input })
      .end((err, res) => {
        if (err) return done(err);

        assert.equal(res.body, 'invalid number and unit');

        done();
      });
  });

  test('Convert with No Number: "kg"', (done) => {
    let input = 'kg';

    chai
      .request(server)
      .get('/api/convert')
      .query({ input })
      .end((err, res) => {
        if (err) return done(err);

        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.approximately(res.body.returnNum, 2.2, 0.1);
        assert.equal(res.body.returnUnit, 'lbs');
        assert.equal(res.body.string, '1 kilograms converts to 2.20462 pounds');

        done();
      });
  });
});
