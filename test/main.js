'use strict';

/* eslint-env node, mocha */
/* eslint import/no-extraneous-dependencies:0 */

const parser = require('../');
const expect = require('chai').expect;

describe('Datatable parser module', () => {
  it('Should export a function', () => {
    expect(parser).to.be.a('function');
  });
});

