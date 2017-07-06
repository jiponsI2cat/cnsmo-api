'use strict';

var chai = require('chai');

require('./support');
var paginationHelper = require('../../helpers/pagination');
var expect = chai.expect;
var fixture = require('./fixtures/paginationHelper');

describe('PaginationHelper', () => {
  describe('GetPaginationParams', () => {
    it('should get pagination params', (done) => {
      const data = fixture.paginationOK;
      const result = paginationHelper.getPaginationParams(data);
      expect(result).to.have.property('limit');
      expect(result).to.have.property('skip');
      expect(result).to.have.property('sort');
      done();
    });
  });

  describe('setPaginationResponse', () => {
    it('should get pagination response', (done) => {
      const data = fixture.paginationHeaders;
      const req = {headers: { }};
      req.header = function(key, value) {
        req.headers[key] = value;
      };
      const result = paginationHelper.setPaginationResponse(req, data);
      expect(result.headers).to.have.property('X-Nuage-Page');
      expect(result.headers['X-Nuage-Page'])
        .to.be.equals(data['X-Nuage-Page']);

      expect(result.headers).to.have.property('X-Nuage-PageSize');
      expect(result.headers['X-Nuage-PageSize'])
        .to.be.equals(data['X-Nuage-PageSize']);

      expect(result.headers).to.have.property('X-Nuage-Count');
      expect(result.headers['X-Nuage-Count'])
        .to.be.equals(data['X-Nuage-Count']);

      expect(result.headers).to.have.property('X-Nuage-OrderBy');
      expect(result.headers['X-Nuage-OrderBy'])
        .to.be.equals(data['X-Nuage-OrderBy']);

      expect(result.headers).to.have.property('Access-Control-Expose-Headers');
      done();
    });
  });

});
