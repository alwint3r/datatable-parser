'use strict';

/* eslint-env node, mocha */
/* eslint import/no-extraneous-dependencies:0 */

const parser = require('../');
const expect = require('chai').expect;

// mocks
const request = require('./mocks/request.json');

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
    const expected = {
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

    expect(parser(request)).to.deep.equal(expected);
  });
});
