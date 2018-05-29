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
    it('responds and post get to /fill', function(done) {
      chai.request(app)
      .get('/fill')
      .send({ Food_Gangcurry: 'Gangcurry', Drink_Keghuay: 'Keghuay' })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  describe('AddPage', function() {
    it('responds and post data to /add', function(done) {
      chai.request(app)
      .post('/add')
      .send({ Gangcurry_comment: 'comment', Gangcurry_score: 2 })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  describe('ReviewPage', function () {
    it('responds and post get to /review', function(done) {
      chai.request(app)
      .get('/review')
      .send({ Food_Gangcurry: 'Gangcurry', Drink_Keghuay: 'Keghuay' })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  describe('AboutPage', function () {
    it('responds to /about', function(done) {
      chai.request(app)
      .get('/about')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

});
