'use strict';

var chai = require('chai');

require('./support');
var parserHelper = require('../../helpers/parser');
var expect = chai.expect;
var config = require('./../../config/config');

describe('ParserHelper', () => {
  describe('Parser replaceUrlToVSDDomain', () => {
    it('should return full VSD url', (done) => {
      const inUrl = '/enterprises/345678906789';
      const baseUrl = parserHelper.removeLastCharIfEquals(config.BASE_URL);
      const result = parserHelper.replaceUrlToVSDDomain(baseUrl + inUrl);
      const prefix = 'https://10.0.1.2:8443/nuage/api/v3_2';
      expect(result).to.be.equals(`${prefix}${inUrl}`);
      done();
    });
  });

  describe('Parser removeLastCharIfEquals', () => {
    it('should remove last char', (done) => {
      const prefix = 'https://10.0.1.2:8443/nuage/api/v3_2';
      const result = parserHelper.removeLastCharIfEquals(prefix + '/', '/');
      expect(result).to.be.equals(prefix);
      done();
    });
  });
});
