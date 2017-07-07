'use strict';

var chai = require('chai');

require('./support');
var configCore = require('../../core/config/config');
var routeCore = require('../../core/helpers/route');
var expect = chai.expect;
var fixture = require('./fixtures/core');

describe('Core', () => {
  describe('/config', () => {
    it('should set default values if data is empty', (done) => {
      const emptyObj = fixture.config.emptyObj;
      configCore.set(emptyObj);
      var resultConf = configCore.get(resultConf);
      expect(resultConf).to.has.keys;
      done();
    });

    it('should set passed data as config', (done) => {
      const fullObj = fixture.config.fullObj;
      configCore.set(fullObj);
      var resultConf = configCore.get(resultConf);
      expect(resultConf).to.be.an('Object');
      done();
    });
  });

  describe('/helpers', () => {
    it('should return an empty array if route doesnt exist', (done) => {
      routeCore.getRouteFiles('./routeNotExists', (err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.be.empty;
          done();
        }
      });
    });
  });

});
