'use strict';
let TestTCP = require('test-tcp');

let testTcp = runServer;
exports = module.exports = testTcp;

function runServer(server) {
    return emptyPort().then((port) => {
        return new Promise(resolve => {
            server.listen(port, () => { resolve(server); });
        });
    });
}
exports.runServer = runServer;

function emptyPort(port) {
    return new Promise((resolve, reject) => {
        TestTCP.empty_port(port, (err, gettingPort) => {
            if (err) reject(err);
            resolve(gettingPort);
        });
    });
}
exports.emptyPort = emptyPort;

function emptyPorts(num) {
    return new Promise((resolve, reject) => {
        TestTCP.empty_ports(num, (err, ports) => {
            if (err) reject(err);
            resolve(ports);
        });
    });
}
exports.emptyPorts = emptyPorts;
