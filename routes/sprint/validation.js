const Joi = require("joi");
const { HttpCode } = require("../../helpers/constants");

const schemaCreateSprint = Joi.object({
  sprint_name: Joi.string().min(3).max(30).required(),
  date_start: Joi.date(),
  date_end: Joi.date(),
  project_id: Joi.string().min(24).max(34).required(),
});

const schemaUpdateSprint = Joi.object({
  sprint_name: Joi.string().min(3).max(30).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    const { message } = err;
    next({ status: HttpCode.BAD_REQUEST, message });
  }
};

module.exports.validateCreateSprint = (req, res, next) => {
  return validate(schemaCreateSprint, req.body, next);
};

module.exports.validateUpdateSprint = (req, res, next) => {
  return validate(schemaUpdateSprint, req.body, next);
};
