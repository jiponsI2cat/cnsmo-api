'use strict';

var app = require('../../app').app;
var request = require('supertest');
var fixture = require('./fixtures/users');
var expect = require('chai').expect;

describe('AUTHENTICATE /authenticate', () => {
  const AuthOKMsg = 'should respond with 200 code if authentication success';
  it(AuthOKMsg, (done) => {
    const data = Object.assign({}, fixture.credentials);
    request(app)
      .post('/api/v1/authenticate')
      .send(data)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(err).to.be.null;
        expect(res).to.be.not.null;
        done();
      });
  });

  const AuthKOMsg = 'should respond with 401 code if authentication fail';
  it(AuthKOMsg, (done) => {
    const data = Object.assign({}, fixture.credentials);
    data.username = data.username + '999';
    request(app)
      .post('/api/v1/authenticate')
      .send(data)
      .set('Accept', 'application/json')
      .expect(401)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        const msg = res.body;
        expect(msg).to.be.an.Object;
        expect(msg.code).to.be.not.null;
        done();
      });
  });
});
