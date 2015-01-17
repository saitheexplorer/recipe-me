var _ = require('lodash');
var Boom = require('boom');
var lowdb = require('lowdb');
var path = require('path');
var shortid = require('shortid');

var db = lowdb(path.resolve(__dirname, 'recipes.json'));
var recipes = db('recipes');

module.exports = {
    findOne: function (id) {
        var result = recipes.find({id: id}).value();
        if (result) return result;
        else return Boom.notFound();
    },

    findAll: function () {
        return recipes.where({active: true}).value();
    },

    update: function (id, data) {
        data.updated = new Date();
        data.ingredients = _.compact(data.ingredients);
        data.steps = _.compact(data.steps);

        return recipes.find({id: id}).assign(data).value();
    },

    create: function (data) {
        data.id = shortid();
        data.active = true;
        data.created = data.updated = new Date();
        data.ingredients = _.compact(data.ingredients);
        data.steps = _.compact(data.steps);

        recipes.push(data);

        return recipes.find({id: data.id}).value();
    },

    destroy: function (id) {
        recipes.find({id: id}).assign({active: false});

        return recipes.find({id: id}).value();
    }
}
