'use strict';

const _ = require('lodash');

function validate(object, required) {
  return _.filter(required, _.has.bind(null, object)).length === required.length;
}

function parser(request) {
  if (!_.isObject(request) || _.isArray(request)) {
    throw new TypeError('Passed argument is not a valid request object');
  }

  const requiredFields = ['draw', 'columns', 'search', 'order', '_', 'start', 'length'];

  if (!validate(request, requiredFields)) {
    throw new TypeError(`${_.difference(requiredFields, _.keys(request))} are required`);
  }
}

module.exports = parser;
