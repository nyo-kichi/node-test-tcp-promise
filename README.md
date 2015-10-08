node-test-tcp-promise
=====================

testing TCP program using Promise, like as Perl's [Test::TCP](https://github.com/tokuhirom/Test-TCP)

```javascript
let http = require('http');
let testTcp = require('test-tcp-promise');

describe('example of test code using Mocha', () => {
    let server1, server2;

    beforeEach(() => {
        let run1 = testTcp(http.createServer());
        let run2 = testTcp(http.createServer());
        return Promise.all([ run1, run2 ]).then(servers => {
            [ server1, server2 ] = servers;
        });
    });

    afterEach(() => {
        server1.close();
        server2.close();
    });

    it('test using server1 and server2', () => {
        // server1 and server2 are running
    });
});
```

Installation
------------

    npm install https://github.com/nyo-kichi/node-test-tcp-promise

Functions
---------
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
