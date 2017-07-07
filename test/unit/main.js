'use strict';

var chai = require('chai');
require('./support');
var configCore = require('../../core/config/config');
var routeCore = require('../../core/helpers/route');
var expect = chai.expect;
var fixture = require('./fixtures/core');

/*describe('Main', () => {
  it('should show a log on sigint exit', () => {
    var exit = process.exit;
    process.exit = function(code) {
      setTimeout(function() {
        exit();
      }, 200);
    };
  });
});
*/
