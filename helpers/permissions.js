'use strict';

var _ = require('lodash');

const superUsers = ['CSPOPERATOR', 'CSPROOT' ];

function isSuperUser(role) {
  return superUsers.indexOf(role) > -1;
}

function getEnterpriseQuery(req) {
  let query;
  const user = req.user;

  if (isSuperUser(user.vsd.role)) {
    query = {};
  } else {
    query = {$elemMatch: {ID: user.vsd.enterpriseID}};
    query = {'vns.data': query};
  }
  return query;
}

function hasPermissionsInDomain(user, domain) {
  const isSuper = isSuperUser(user.vsd.role);
  return !(!isSuper &&
    domain && _.hasIn(domain, 'vns.data[0].parentID') &&
      user.vsd.enterpriseID != domain.vns.data[0].parentID);
}

function hasPermissions(user, organizationId) {
  const isSuper = isSuperUser(user.vsd.role);
  if (!isSuper && user.vsd.enterpriseID != organizationId) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  getEnterpriseQuery: getEnterpriseQuery,
  isSuperUser: isSuperUser,
  hasPermissionsInDomain: hasPermissionsInDomain,
  hasPermissions: hasPermissions,
};
