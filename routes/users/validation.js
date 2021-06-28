const Joi = require('joi')
const {  HttpCode } = require('../../helpers/constants')

const schemaSignup = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua'] },
    })
    .required(),
  password: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
  
})

const schemaLogin = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] }, })
    .required(),
  password: Joi.alternatives().try(Joi.number(), Joi.string()).required(),

})



const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body)
    next()
  } catch (err) {
    next({ status: 'error', code: HttpCode.BAD_REQUEST, message: 'Validation error' })
  }
}

const validateSignup = (req, _res, next) => {
  return validate(schemaSignup, req.body, next)
}

const validateLogin = (req, _res, next) => {
  return validate(schemaLogin, req.body, next)
}



module.exports = { validateSignup, validateLogin, }