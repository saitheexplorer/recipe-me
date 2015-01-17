var Joi = require('joi');

module.exports = Joi.object().keys({
    title: Joi.string().required(),
    ingredients: Joi.array().required(),
    steps: Joi.array().required()
});
