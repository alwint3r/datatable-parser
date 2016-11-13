'use strict';

const _ = require('lodash');

function validate(object, required) {
  return _.filter(required, _.has.bind(null, object)).length === required.length;
}

function boolify(booleanAlike) {
  return booleanAlike === 'true';
}

function getColumnNames(request) {
  return _.map(request.columns, col => col.data);
}

function getOrdering(request) {
  return _.map(request.order, order => [
    request.columns[Number(order.column)].data,
    order.dir,
  ]);
}

function getSearchableColumns(request) {
  return _.filter(request.columns, col => boolify(col.searchable));
}

function getSearchValue(searchable) {
  if (searchable.search.value) {
    return boolify(searchable.search.regex)
      ? new RegExp(searchable.search.value)
      : searchable.search.value;
  }

  return '';
}

function falsySearchValue(search) {
  return _(search)
    .keys()
    .filter(key => !search[key])
    .value();
}

function buildSearch(request) {
  return _(getSearchableColumns(request))
    .map(col => ({
      [col.data]: getSearchValue(col) || getSearchValue(request),
    }))
    .filter(search => falsySearchValue(search).length < 1)
    .value();
}

function parser(request) {
  if (!_.isObject(request) || _.isArray(request)) {
    throw new TypeError('Passed argument is not a valid request object');
  }

  const requiredFields = ['draw', 'columns', 'search', 'order', '_', 'start', 'length'];

  if (!validate(request, requiredFields)) {
    throw new TypeError(`${_.difference(requiredFields, _.keys(request))} are required`);
  }

  return {
    search: buildSearch(request),
    order: getOrdering(request),
    columns: getColumnNames(request),
    start: Number(request.start),
    length: Number(request.length),
  };
}

module.exports = parser;
