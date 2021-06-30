const Joi = require("joi");

const schemaCreateProject = Joi.object({
  name: Joi.string().min(1).max(30).required(),

  description: Joi.string().max(150),
});

const schemaUpdateProject = Joi.object({
  name: Joi.string().min(1).max(30).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    const { message } = err;
    next({ status: 400, message });
  }
};

module.exports.validateCreateProject = (req, res, next) => {
  return validate(schemaCreateProject, req.body, next);
};

module.exports.validateUpdateProject = (req, res, next) => {
  return validate(schemaUpdateProject, req.body, next);
};
