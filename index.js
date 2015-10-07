'use strict';
let TestTCP = require('test-tcp');

function testTcp() {}

testTcp.emptyPort = (port) => {
    return new Promise((resolve, reject) => {
        TestTCP.empty_port(port, (err, gettingPort) => {
            if (err) reject(err);
            resolve(gettingPort);
        });
    });
};

module.exports = testTcp;
