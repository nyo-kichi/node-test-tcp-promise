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

testTcp.emptyPorts = (num) => {
    return new Promise((resolve, reject) => {
        TestTCP.empty_ports(num, (err, ports) => {
            if (err) reject(err);
            resolve(ports);
        });
    });
};

module.exports = testTcp;
