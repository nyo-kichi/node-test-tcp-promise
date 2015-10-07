'use strict';
let assert = require('power-assert');
let testTcp = require('../');

describe('index', () => {
    describe('require', () => {
        it('should return function()', () => {
            assert(typeof testTcp === 'function');
        });
    });

    describe('emptyPort()', () => {
        it('should return Promise object', () => {
            let got = testTcp.emptyPort();
            assert(got instanceof Promise);
            return got;
        });

        it('should get empty port', () => {
            return testTcp.emptyPort().then(port => {
                assert(port);
            });
        });

        it('should get specified port', () => {
            return testTcp.emptyPort(55555).then(port => {
                assert(55555 <= port && port < 60000);
            });
        });
    });

    describe('emptyPort() error', () => {
        let TestTCP = require('test-tcp'),
            backup = TestTCP.empty_port;

        afterEach(() => { TestTCP.empty_port = backup; });

        it('should catch error if error occur', () => {
            TestTCP.empty_port = (port, callback) => {
                process.nextTick(() => { callback('empty port not found'); });
            };

            return testTcp.emptyPort().catch(err => {
                assert(err === 'empty port not found');
            });
        });
    });
});
