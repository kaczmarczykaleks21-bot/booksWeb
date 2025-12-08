const Joi = require("joi");

module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    // ujednolicone formatowanie błędów
    const details = error.details.map((d) => ({
      message: d.message,
      path: d.path,
    }));
    return res.status(400).json({ status: "error", errors: details });
  }
  req.validatedBody = value;
  next();
};
