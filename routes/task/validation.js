const Joi = require("joi");
const { HttpCode } = require("../../helpers/constants");

const schemaCreateTask = Joi.object({
  task_name: Joi.string().min(3).max(30).required(),
  scheduled_hours: Joi.number().required(),
  sprint: Joi.string().min(24).max(34).required(),
  hours_spent: Joi.number(),
  hours_spent_per_day: Joi.number(),
});

const schemaSearchTask = Joi.object({
  task_name: Joi.string().min(3).max(30).required(),
});

const schemaUpdateTask = Joi.object({
  hours_spent_per_day: Joi.number().required(),
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

module.exports.validateCreateTask = (req, res, next) => {
  return validate(schemaCreateTask, req.body, next);
};

module.exports.validateUpdateTask = (req, res, next) => {
  return validate(schemaUpdateTask, req.body, next);
};

module.exports.validateSearchTask = (req, res, next) => {
  return validate(schemaSearchTask, req.body, next);
};
