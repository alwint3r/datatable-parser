'use strict';

/* eslint-env node, mocha */
/* eslint import/no-extraneous-dependencies:0 */

const parser = require('../');
const _ = require('lodash');
const expect = require('chai').expect;

// mocks
const request = require('./mocks/request.json');

const generallyExpected = {
  search: [],
  order: [
    ['no', 'asc'],
  ],
  columns: [
    'no',
    'name',
    'address',
    'phone',
    'email',
  ],
  start: 0,
  length: 10,
};

describe('Datatable parser module', () => {
  it('Should export a function', () => {
    expect(parser).to.be.a('function');
  });

  it('Should throws if it is passed invalid argument type', () => {
    const invalidArgs = [
      'a string',
      true,
      1234,
      [],
    ];

    invalidArgs.forEach(arg => expect(parser.bind(null, arg)).to.throw(TypeError));
  });

  it('Should trhows if it is passed invalid request object', () => {
    const validParam = {
      draw: '1',
      columns: [],
      search: {},
      start: '0',
      length: '10',
      order: [],
      _: '12312415',
    };

    const params = [
      {
        draw: '1',
        columns: [],
      },
      {
        draw: '1',
        order: [],
      },
      {
        columns: [],
        start: '0',
        length: '10',
      },
      {},
    ];

    params.forEach(arg => expect(parser.bind(null, arg)).to.throw(TypeError));
    expect(parser.bind(null, validParam)).not.to.throw(TypeError);
  });
});

describe('parser(request) function', () => {
  it('Should generate expected output', () => {
    expect(parser(request)).to.deep.equal(generallyExpected);
  });

  it('Should generate output with expected ordering', () => {
    const expected = _.merge(generallyExpected, {
      order: [
        ['name', 'desc'],
      ],
    });

    const newRequest = _.merge(request, {
      order: [
        {
          column: '1',
          dir: 'desc',
        },
      ],
    });

    expect(parser(newRequest)).to.deep.equal(expected);
  });


  it('Should generate output with expected search', () => {
    const expected = _.merge(generallyExpected, {
      search: [
        { no: 'Alwin' },
        { name: 'Alwin' },
        { address: 'Alwin' },
        { phone: 'Alwin' },
        { email: 'Alwin' },
      ],
    });

    const withSearch = _.merge(request, {
      search: {
        value: 'Alwin',
        regex: 'false',
      },
    });

    expect(parser(withSearch)).to.deep.equal(expected);
  });
});
