var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var should = chai.should();
chai.use(chaiHttp);

var app = require('../index');

describe('Unit testing', function () {

  describe('HomePage', function () {
    it('responds to /', function (done) {
      chai.request(app)
      .get('/')
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  describe('FillPage', function () {
    it('responds and post data to /fill', function(done) {
      chai.request(app)
      .post('/fill')
      .send({ F_Gangcurry: 'Gangcurry', D_Keghuay: 'Keghuay' })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  describe('ReviewPage', function () {
    it('responds and post data to /review', function(done) {
      chai.request(app)
      .post('/review')
      .send({ F_Gangcurry: 'Gangcurry', D_Keghuay: 'Keghuay' })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        res.body.should.have.property('F_Gangcurry');
        res.body.F_Gangcurry.should.equal('Gangcurry');
        res.body.should.have.property('D_Keghuay');
        res.body.D_Keghuay.should.equal('Keghuay');
        done();
      });
    });
  });

  describe('UndefindPage', function () {
    it('responds to /undefined', function(done) {
      chai.request(app)
      .get('/undefined')
      .end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

});
