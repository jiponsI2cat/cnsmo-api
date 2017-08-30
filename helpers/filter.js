'use strict';
var _ = require('lodash');


function getMaxByField(data, field) {
  const max = _.maxBy(data, (o) => {
    return (_.has(o, field)) ? o[field] : null;
  });

  return (_.has(max, field)) ? max[field] : null;
}

module.exports = {
  getMaxByField: getMaxByField
};
