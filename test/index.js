'use strict';
let assert = require('power-assert');
let testTcp = require('../');

describe('index', () => {
    describe('require', () => {
        it('should return function()', () => {
            assert(typeof testTcp === 'function');
        });
    });
});
