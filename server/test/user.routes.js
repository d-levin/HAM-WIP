var request = require('supertest');
var assert = require('assert');

var serverURL = 'http://hamwip.azurewebsites.net';
var timeout = 10000;

describe('USER ROUTES', function() {
  var id = '';
  var response = null;
  describe('Get all users: GET /users', function() {
    it('respond with json', function(done) {
      this.timeout(timeout);
      request(serverURL)
        .get('/users')
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
  describe('Create user: POST /users', function() {
    it('respond with json', function(done) {
      this.timeout(timeout);
      var user = {
        firstName: 'Mocha_firstName',
        lastName: 'Mocha_lastName',
        email: 'mocha@email.com',
        password: 'mochapassword'
      };
      request(serverURL)
        .post('/users')
        .send(user)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) return done(err);
          id = res.body.id;
          done();
        });
    });
  });
  describe('Update user: PUT /users/:id', function() {
    it('respond with json', function(done) {
      this.timeout(timeout);
      var body = {
        firstName: 'Mocha_updated_firstName',
        lastName: 'Mocha_updated_lastName',
        email: 'mocha_updated@email.com',
        password: 'mochaupdatedpassword'
      };
      request(serverURL)
        .put('/users/' + id)
        .send(body)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) return done(err);
          response = res;
          done();
        });
    });
    it('user was updated', function(done) {
      this.timeout(timeout);
      request(serverURL)
        .get('/users/' + id)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(response.body.firstName, 'Mocha_updated_firstName');
          done();
        });
    });
  });
  describe('Delete user: DELETE /users/:id', function() {
    it('respond with json', function(done) {
      this.timeout(timeout);
      request(serverURL)
        .delete('/users/' + id)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });
});
