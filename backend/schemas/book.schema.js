const Joi = require("joi");

const bookSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  author: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow("", null),
  year: Joi.number().integer().min(0).max(3000).optional(),
  isbn: Joi.string().alphanum().min(5).max(20).optional(),
});

module.exports = { bookSchema };
