'use strict';
var async = require('async')
  , _ = require('lodash')
  , Q = require('q')
  , core = require('../../core')
  , log4js = require('log4js')
  , Client = require('node-rest-client').Client;

var logger = log4js.getLogger('DomainL3ModelMethods');
var client = new Client();
var dbHelpers = core.helpers.db;


var config = require('../../config/config');
var parser = require('../../helpers/parser');
var modelCommon = require('../../helpers/model-common');
var vnsLiteHelper = require('../../helpers/vnslite');
var domainL3Helper = require('../../helpers/domainL3');

module.exports.init = function(schema, modelName) {
  // our DomainL3 element is used in both VNS and VNSLite (as vprn),
  // Thus we will send DomainL3 related requests to both urls

  /*
  In this method the do & undo cb implement the following format:
  (err, {code, response})
  The asyncParallelRollback promises return responses
  as follows:
  errors => ({errors, code})
  ok => ({response, code})
  */
  schema.statics.add = function(data, enterpriseId, headers) {
    var deferred = Q.defer();

    logger.debug('Adding domainL3', data);
    var Organization = dbHelpers.db.model('Organization');
    var DomainL3 = dbHelpers.db.model(modelName);

    const domainPath = `/enterprises/${enterpriseId}/domains`;
    const url = parser.joinUrl(config.VSD_BACKEND, domainPath);
    const args = { headers: headers, data: data };
    const name = data.name;

    function addDomain(cb) {
      client.post(url, args, (_data, response) => {
        const code = response.statusCode;
        let error;
        if (code != 201) {
          error = _data;
          _data = null;
        }
        cb(error, { vns: _data, code: code });
      }).on('error', function(err) {
        cb(err);
      });
    }

    function addVprn(domain, cb) {
      const enterprise = domain.vns[0];
      const rt = enterprise.routeTarget;

      const funcs = [
        (cb) => { Organization.findOne({ 'vns.id': enterpriseId }, cb); },
        (cb) => {
          DomainL3.find({})
            .sort({ 'vnsLite.id': -1 }).limit(1).exec(cb);
        },
        (cb) => {
          DomainL3.find({})
            .sort({ 'vnsLite.vplsId': -1 }).limit(1).exec(cb);
        }
      ];

      async.parallel(funcs, (err, results) => {
        if (err) {
          cb(_.first(err));
        } else {
          const organization = results[0];
          const customer = organization.vnsLite.id;
          let vprnId = (!_.isEmpty(results[1])) ? results[1][0].vnsLite.id : 1;
          const vplsId =
            (!_.isEmpty(results[2])) ? results[2][0].vnsLite.vplsId : 2;
          vprnId = _.max([vprnId, vplsId, domainL3Helper.getMaxServiceId()]);
          vprnId += 1;
          const result = domainL3Helper.addVprn(
            vprnId, customer, name, rt);
          const formattedError = vnsLiteHelper.formatError(result.err, true);
          if (formattedError) {
            domain.code = formattedError.code;
            err = formattedError.errors;
          }
          domain.vnsLite = result.resultData;
          logger.debug('Adding Vprn in vnslite', result);
          cb(err, domain);
        }
      });
    }

    function process() {
      async.waterfall([addDomain, addVprn], (err, result) => {
        let code = result.code;
        delete result.code;
        if (err) {
          deferred.reject({ code: code, errors: err });
          if (_.has(result, 'vns[0].ID')) {
            const id = result.vns[0].ID;
            domainL3Helper.removeDomain(id, headers, (err) => { });
          }
        } else {
          const id = result.vns[0].ID;
          const data = { vns: { id: id, data: result.vns } };
          data.vnsLite = { id: result.vnsLite.vprn.id,
            vplsId: result.vnsLite.vpls.id,
            data: result.vnsLite };
          data.organizationId = result.vns[0].parentID;
          var domain = new DomainL3(data);

          async.waterfall([
            (cb) => { domain.save((err, data) => { cb(err, data); }); },
            (data, cb) => {
              const update = { $addToSet: { domainsL3: domain._id } };
              const options = { returnNewDocument: 1, multi: 0 };
              Organization.update({ 'vns.id': data.organizationId },
                update, options).exec(
                (err, result) => {
                  cb(err, result);
                });
            }
          ], (error, saveResult) => {
            if (error) {
              code = 500;
              deferred.reject({ code: code, errors: error });
            } else {
              var response = domain.toObject();
              deferred.resolve({ code: code, response: response });
            }
          });
        }
      });
    }

    process();
    return deferred.promise;
  };

  schema.statics.delete = function(vnsId, headers) {
    var deferred = Q.defer();
    var DomainL3 = dbHelpers.db.model(modelName);
    var domainObject;

    var funcs = [
      (cb) => { domainL3Helper.removeDomain(vnsId, headers, cb); },
      (result, cb) => { DomainL3.findOne({ 'vns.id': vnsId }).exec(cb); },
      (domain, cb) => {
        domainObject = domain;
        let code = 204;
        let error;

        if (domain && domain.vnsLite.data) {
          const result = domainL3Helper.removeVprn(domain.vnsLite.data);
          const formattedError = vnsLiteHelper.formatError(result.err, true);
          if (formattedError) {
            code = formattedError.code;
            error = formattedError.errors;
          }
        }
        //else condition we have a mismatch between api/vsr
        // and database document do nothing because this means
        // the domain does not already exits
        cb(error, { code: code });
      },
      (result, cb) => {
        if (domainObject) {
          domainObject.remove((err, response) => {
            if (err) { result.code = 500; }
            cb(err, result);
          });
        }
      },
      (result, cb) => {
        var Organization = dbHelpers.db.model('Organization');
        const update = { $pull: { domainsL3: domainObject._id } };
        const options = { returnNewDocument: 1, multi: 0 };
        Organization.update(
          { 'vns.id': domainObject.organizationId }, update, options).exec(
          (err, result) => {
            if (err) {
              result.code = 500;
            }
            cb(err, result);
          });
      }
    ];

    async.waterfall(funcs,
      (err, result) => {
        if (err) {
          deferred.reject({ code: result.code, errors: err });
        } else {
          deferred.resolve({ code: 204, response: {} });
        }
      });

    return deferred.promise;
  };

  schema.statics.get = function(vnsId, cb) {
    modelCommon.get(modelName, '', vnsId, cb);
  };

  schema.statics.getAll = function(search, select, pagination, cb) {
    modelCommon.getAll(modelName, search, select, pagination, cb);
  };

  schema.statics.manageJobs = function(data, id, headers) {
    var deferred = Q.defer();
    const domainPath = `/domains/${id}/jobs`;
    const url = parser.joinUrl(config.VSD_BACKEND, domainPath);
    const args = { headers: headers, data: data };
    var policyChangeStatus =
      (data.command === 'BEGIN_POLICY_CHANGES') ? 'STARTED'
        : (data.command === 'APPLY_POLICY_CHANGES') ? 'APPLIED'
          : (data.command === 'DISCARD_POLICY_CHANGES') ? 'DISCARDED'
            : null;

    function launchJob(cb) {
      client.post(url, args, (_data, response) => {
        const code = response.statusCode;
        let error;
        if (code != 201) {
          error = _data;
          _data = null;
        }
        cb(error, { vns: _data, code: code });
      }).on('error', function(err) {
        cb(err);
      });
    }

    function syncPolicyChangeStatus(res, cb) {
      var DomainL3 = dbHelpers.db.model(modelName);
      DomainL3.findOneAndUpdate({ 'vns.id': id },
        { $set: { 'vns.data.0.policyChangeStatus': policyChangeStatus } })
        .exec((err, result) => {
          if (err) {
            result.code = 500;
          }
          cb(err, result);
        });
    }

    function process() {
      async.waterfall([launchJob, syncPolicyChangeStatus], (err, res) => {
        if (err) {
          deferred.reject({ code: res.code, errors: err });
        } else {
          deferred.resolve({ code: 200, response: {} });
        }
      });
    }

    process();

    return deferred.promise;
  };

  return schema;

};
