'use strict';
/*var request = require('supertest');
var expect = require('chai').expect;
//var logger = require('log4js').getLogger('test.acceptances.domainL3');


var app = require('../../app').app;
var fixture = require('./fixtures/domainL3');
var support = require('./support');
var token = support.global.token;
var enterprise = support.global.enterprise;
var template = support.global.domainL3Template;

let domain;*/
/*
describe('ADD /domain', () => {
  it('should respond with 201 code', (done) => {
    const data = Object.assign({}, fixture.newDomain);
    data.templateID = template.ID;
    request(app)
      .post(`/sdpn/enterprises/${enterprise.ID}/domains?token=${token}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.not.null;
        if (res) {
          expect(res.body).to.be.not.null;
          if (res.body) {
            domain = res.body;
          }
        }
        done(err);
      });
  });

  it('should respond with 404 code if enterprise' +
    ' does not exist', (done) => {
    const data = Object.assign({}, fixture.newDomain);
    data.templateID = template.ID;
    request(app)
      .post(`/sdpn/enterprises/${enterprise.ID}+1/domains?token=${token}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.not.null;
        if (res) {
          expect(res.body).to.be.not.null;
          if (res.body) {
            expect(res.body.errors).to.be.not.null;
          }
        }
        done(err);
      });
  });

  it('should respond with 400 if name is invalid', (done) => {
    const data = Object.assign({}, fixture.invalidDomain);
    data.templateID = template.ID;
    request(app)
      .post(`/sdpn/enterprises/${enterprise.ID}/domains?token=${token}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        expect(res).to.be.not.null;
        if (res) {
          expect(res.errors).to.be.not.null;
        }
        done(err);
      });
  });
});

describe('GET /domain', () => {
  it('should respond with 200 and the return the domain', (done) => {
    request(app)
      .get(`/sdpn/domains/${domain.vns.data[0].ID}?token=${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.not.null;
        if (res) {
          expect(res.body).to.be.not.null;
          if (res.body) {
            const data = res.body;
            expect(data).to.be.not.null;
            expect(data).to.have.deep.property('vnsLite.data');
            expect(data).to.have.deep.property('vns.data');
            expect(data.vnsLite.data).to.be.an.object;
            expect(data.vns.data).to.be.an.array;
          }
        }
        done(err);
      });
  });

  it('should respond with 404 and and error message', (done) => {
    request(app)
      .get(`/sdpn/domains/${domain.vns.data[0].ID}+1?token=${token}`)
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.not.null;
        if (res) {
          expect(res.body).to.be.not.null;
          if (res.body) {
            const data = res.body;
            expect(data).to.be.not.null;
            expect(data).to.have.deep.property('errors');
          }
        }
        done(err);
      });
  });

  it('should respond with 403', (done) => {
    const tokenAdmin = support.global.adminToken;
    request(app)
      .get(`/sdpn/domains/${domain.vns.data[0].ID}?token=${tokenAdmin}`)
      .set('Accept', 'application/json')
      .expect(403)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.not.null;
        if (res) {
          expect(res.body).to.be.not.null;
          if (res.body) {
            const data = res.body;
            expect(data).to.be.not.null;
            expect(data).to.have.deep.property('errors');
          }
        }
        done(err);
      });
  });
});


describe('GET /domains', () => {
  it('should respond with 200 and the return the domains', (done) => {
    request(app)
      .get(`/sdpn/enterprises/${enterprise.ID}/domains?token=${token}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.not.null;
        if (res) {
          expect(res.body).to.be.not.null;
          if (res.body) {
            const data = res.body;
            expect(data).to.be.an.array;
            expect(data.length).to.be.above(0);
            expect(data[0]).to.have.deep.property('vnsLite.data');
            expect(data[0]).to.have.deep.property('vns.data');
            expect(data[0].vnsLite.data).to.be.an.object;
            expect(data[0].vns.data).to.be.an.array;
          }
        }
        done(err);
      });
  });

  it('should respond with 403 if user has not permissions ' +
    ' in the given enterprise', (done) => {
    const token = support.global.adminToken;
    const url = `/sdpn/enterprises/${enterprise.ID}/domains?token=${token}`;
    request(app)
      .get(url)
      .set('Accept', 'application/json')
      .expect(403)
      .end((err, res) => {
        expect(res).to.be.not.null;
        if (res) {
          expect(res.body).to.be.not.null;
          if (res.body) {
            expect(res.body.errors).to.be.not.null;
          }
        }
        done(err);
      });
  });

  it('should respond with 200 code and a list of domains' +
    ' according to pagination', (done) => {
    var url = `/sdpn/enterprises/${enterprise.ID}/domains?token=${token}`;
    url += '&X-Nuage-Page=0&X-Nuage-PageSize=1';
    request(app)
      .get(url)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.not.null;
        if (res) {
          expect(res.body).to.be.not.null;
          if (res.body) {
            var enterprises = res.body;
            expect(enterprises).to.be.an.Array;
            expect(enterprises.length).to.be.equals(1);
          }
        }
        done();
      });
  });
});

describe('MANAGE JOB /domain', () => {
  it('should respond with 200 code if launch job'
    + 'command is executed', (done) => {
    const data = Object.assign({}, fixture.beginJob);
    request(app)
      .post(`/sdpn/domains/${domain.vns.data[0].ID}/jobs?token=${token}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.not.null;
        if (res) {
          expect(res.body).to.be.not.null;
        }
        done(err);
      });
  });

  it('should respond with 409 code if job' +
    ' is already started', (done) => {
    const data = Object.assign({}, fixture.beginJob);
    // There's timeout of 3 seconds because this assertion have to wait
    // the propagation of previous assertion
    setTimeout(() => {
      request(app)
        .post(`/sdpn/domains/${domain.vns.data[0].ID}/jobs?token=${token}`)
        .send(data)
        .set('Accept', 'application/json')
        .expect(409)
        .end((err, res) => {
          expect(err).to.be.null;
          if (res) {
            expect(res.body).to.be.not.null;
            if (res.body) {
              expect(res.body.errors).to.be.not.null;
            }
          }
          done(err);
        });
    }, 3000);
  });

  it('should respond with 400 if command key is'
    + 'not present in body request of job', (done) => {
    const data = Object.assign({}, fixture.invalidJob);
    request(app)
      .post(`/sdpn/domains/${domain.vns.data[0].ID}/jobs?token=${token}`)
      .send(data)
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        expect(res).to.be.not.null;
        if (res) {
          expect(res.errors).to.be.not.null;
        }
        done(err);
      });
  });
});


describe('Remove /domain', () => {
  it('should respond with 201 code', (done) => {
    request(app)
      .delete(`/sdpn/domains/${domain.vns.data[0].ID}?token=${token}`)
      .set('Accept', 'application/json')
      .expect(204)
      .end((err, res) => {
        expect(err).to.be.null;
        done(err);
      });
  });
});


*/
