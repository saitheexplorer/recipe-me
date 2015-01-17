var Hapi = require('hapi');

var options = {
    debug: {
        request: ['error']
    }
};

var server = new Hapi.Server(options);

server.connection({
    port: '3000',
    routes: {
        validate: {
            options: {
                allowUnknown: true
            }
        }
    }
});

server.register({
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            args: [{log: '*', response: '*', error: '*'}]
        }]
    }
}, function (error) {
    if (error) throw error;

    server.register([
        require('./routes/recipes'),
        require('./routes/index')
    ], function (error) {
        if (error) throw error;
        console.log('Server started.');
        server.start();
    });
});

