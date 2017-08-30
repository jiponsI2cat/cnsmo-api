'use strict';
var _ = require('lodash');

function getPaginationParams(req) {
  const pagination = {};

  var attr = getPaginationHeaders(req);
  const page = attr['X-Nuage-Page'];
  const pageSize = attr['X-Nuage-PageSize'];
  const orderBy = attr['X-Nuage-OrderBy'];

  if (page && pageSize) {
    pagination.limit = pageSize;
    pagination.skip = pageSize * page;
  }

  if (orderBy) {
    const values = orderBy.split(' ');
    if (_.isArray(values) && values.length > 1) {
      pagination.sort = {};
      pagination.sort[values[0]] = values[1].toLowerCase();
    }
  }
  return pagination;
}

function getPaginationHeaders(req) {
  const attr = ['X-Nuage-OrderBy', 'X-Nuage-PageSize', 'X-Nuage-Page'];
  var pagination = _.pick(req.query, attr);
  if (_.isEmpty(pagination)) {
    pagination = _.pick(req.headers, attr);
  }

  return pagination;
}

function setPaginationResponse(res, pag) {
  if (_.has(pag, 'X-Nuage-Count')) {
    res.header('X-Nuage-Count', pag['X-Nuage-Count']);
  }
  if (_.has(pag, 'X-Nuage-Page')) {
    res.header('X-Nuage-Page', pag['X-Nuage-Page']);
  }
  if (_.has(pag, 'X-Nuage-PageSize')) {
    res.header('X-Nuage-PageSize', pag['X-Nuage-PageSize']);
  }
  if (_.has(pag, 'X-Nuage-OrderBy')) {
    res.header('X-Nuage-OrderBy', pag['X-Nuage-OrderBy']);
  }

  let head = 'X-Nuage-Organization, X-Nuage-ProxyUser, X-Nuage-OrderBy, ';
  head += 'X-Nuage-FilterType, X-Nuage-Filter, X-Nuage-Page, ';
  head += 'X-Nuage-PageSize, X-Nuage-Count, X-Nuage-Custom';
  res.header('Access-Control-Expose-Headers', head);

  return res;
}


module.exports = {
  getPaginationParams: getPaginationParams,
  setPaginationResponse: setPaginationResponse,
  getPaginationHeaders: getPaginationHeaders,
};
