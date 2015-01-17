module.exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler: {
            file: 'index.html'
        }
    });

    server.route({
        method: 'GET',
        path: '/{filename}',
        handler: {
            directory: {
                path: 'public',
                listing: true
            }
        }
    });

    next();
}

module.exports.register.attributes = {name: 'indexRoutes'};
