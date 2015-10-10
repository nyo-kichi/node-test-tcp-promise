node-test-tcp-promise
=====================

testing TCP program using Promise, like as Perl's [Test::TCP](https://github.com/tokuhirom/Test-TCP)

__Require Node.js v4.0.0 or above.__

```javascript
let http = require('http');
let net = require('net');
let testTcp = require('test-tcp-promise');

describe('example of test code using Mocha', () => {
    let httpSvr, echoSvr;

    beforeEach(() => {
        let run1 = testTcp(http.createServer());
        let run2 = testTcp(net.createServer());

        return Promise.all([ run1, run2 ]).then(servers => {
            httpSvr = servers[0];
            echoSvr = servers[1];
        });
    });

    afterEach(() => {
        [ httpSvr, echoSvr ].forEach(server => { server.close(); });
    });

    it('test using httpSvr and echoSvr', () => {
        // httpSrv and echoSrv are running
    });
});
```

This module is a wrapper of [node-test-tcp](https://github.com/sugyan/node-test-tcp) to use Promise.

Installation
------------

    npm install https://github.com/nyo-kichi/node-test-tcp-promise

Example
-------
```javascript
'use strict';
let assert = require('assert');
let http = require('http');
let net = require('net');
let testTcp = require('test-tcp-promise');

describe('example of test code using Mocha', () => {
    let httpSvr, echoSvr;

    beforeEach(() => {
        let run1 = testTcp(http.createServer());
        let run2 = testTcp(net.createServer());

        return Promise.all([ run1, run2 ]).then(servers => {
            httpSvr = servers[0];
            echoSvr = servers[1];
        });
    });

    afterEach(() => {
        [ httpSvr, echoSvr ].forEach(server => { server.close(); });
    });

    it('test using httpSvr and echoSvr', () => {
        httpSvr.on('request', (req, res) => {
            res.writeHead(200, { 'Content-type': 'text/plain' });
            res.end();
        });
        echoSvr.on('connection', (socket) => {
            socket.write('hello\r\n');
            socket.pipe(socket);
        });

        let get = new Promise(resolve => {
            let url = 'http://localhost:' + httpSvr.address().port;
            let req = http.get(url, (res) => {
                assert(res.statusCode === 200, 'get');
                resolve();
            });
            req.end();
        });

        let echo = new Promise(resolve => {
            let port = echoSvr.address().port;
            let client = net.connect({ port: port }, () => {
                client.write('world!\r\n');
            });
            let buffer = '';
            client.on('data', data => {
                buffer += data.toString();
                client.end();
            });
            client.on('end', () => {
                assert(buffer === 'hello\r\nworld!\r\n', 'echo');
                resolve();
            });
        });

        return Promise.all([ get, echo ]);
    });
});
```

API
---
All functions retrun Promise object.

### testTcp(server)

Run the `server` using a empty port.

Arguments
* `server` - `net.Server` instance

```javascript
testTcp(http.createServer(...)).then(server => {
    // server is running
})
```

### .runServer(server)

alias `testTcp()`

### .emptyPort(port)

Get the available port number.

Arguments
* `port` - the port number you want to use (optional)

```javascript
testTcp.emptyPort().then(port => {
    // port is a number you can use
})
```

### .emptyPorts(num)

Get the array of available port number.

Arguments
* `num` - the number you want to get port numbers.

```javascript
testTcp.emptyPorts(3).then(ports => {
    // ports are 3 port numbers you can use
})
```

See Also
--------
* [Test::TCP](https://github.com/tokuhirom/Test-TCP)
* [node-test-tcp](https://github.com/sugyan/node-test-tcp)

Author
------
nyo-kichi

License
-------
Copyright (c) 2015 nyo-kichi

Licensed under the MIT license.
