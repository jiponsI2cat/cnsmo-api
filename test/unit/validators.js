'use strict';
var chai = require('chai');

require('./support');
var expect = chai.expect;

var domainL3 = require('../../validators/domainL3');
var fixture = require('./fixtures/validators');

describe('Validator: DomainL3', () => {
  describe('IsInvalid add method', () => {
    it('should return undefined msg if domain is valid', (done) => {
      const data = fixture.domainL3Valid;
      const result = domainL3.isInvalid('add', data);
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should return length error msg if name is too long', (done) => {
    const data = fixture.domainL3InvalidLengthName;
    const result = domainL3.isInvalid('add', data);
    expect(result).to.be.not.undefined;
    done();
  });


  let msg = 'should return bad request if request ';
  msg += 'does not have required params';
  it(msg, (done) => {
    const data = {};
    const result = domainL3.isInvalid('add', data);
    expect(result).to.be.not.undefined;
    done();
  });

  msg = 'should return undefined if no method is specified ';
  it(msg, (done) => {
    const data = {};
    const result = domainL3.isInvalid(undefined, data);
    expect(result).to.be.undefined;
    done();
  });
});
