var request = require('supertest');
var assert = require('assert');

var serverURL = 'http://hamwip.azurewebsites.net';
var timeout = 10000;

describe('CONTROLLER ROUTES', function() {
  var id = '';
  var response = null;
  describe('Get all controllers: GET /controllers', function() {
    it('respond with json', function(done) {
      this.timeout(timeout);
      request(serverURL)
        .get('/controllers')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Create controller: POST /controllers', function() {
    it('respond with json', function(done) {
      this.timeout(timeout);
      var controller = {
        make: 'fakecontroller',
      };
      request(serverURL)
        .post('/controllers')
        .send(controller)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) return done(err);
          id = res.body.id;
          done();
        });
    });
  });
  describe('Update controller: PUT /controllers/:id', function() {
    it('respond with json', function(done) {
      this.timeout(timeout);
      var body = {
        make: 'updatedfakecontroller',
      };
      request(serverURL)
        .put('/controllers/' + id)
        .send(body)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) return done(err);
          response = res;
          done();
        });
    });
    it('controller was updated', function(done) {
      this.timeout(timeout);
      request(serverURL)
        .get('/controllers/' + id)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(response.body.make, 'updatedfakecontroller');
          done();
        });
    });
  });
  describe('Delete controller: DELETE /controllers/:id', function() {
    it('respond with json', function(done) {
      this.timeout(timeout);
      request(serverURL)
        .delete('/controllers/' + id)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});
