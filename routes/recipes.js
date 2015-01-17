var recipeDB = require('../database');
var Recipe = require('../models/Recipe');

module.exports.register = function (server, options, next) {
    server.route({
        path: '/recipes/{id?}',
        method: 'GET',
        handler: function (req, reply) {
            if (!req.params.id) return reply(recipeDB.findAll());
            else reply(recipeDB.findOne(req.params.id));
        }
    });

    server.route({
        path: '/recipes',
        method: 'POST',
        handler: function (req, reply) {
            return reply(req.payload);
        },
        config: {
            validate: {
                payload: Recipe
            }
        }
    });

    server.route({
        path: '/recipes/{id}',
        method: 'PUT',
        handler: function (req, reply) {
            return reply(recipeDB.update(req.params.id, req.payload));
        },
        config: {
            validate: {
                payload: Recipe
            }
        }
    });

    server.route({
        path: '/recipes/{id}',
        method: 'DELETE',
        handler: function (req, reply) {
            return reply(req.params.id);
        }
    });

    next();
};

module.exports.register.attributes = {name: 'recipeRoutes'};
