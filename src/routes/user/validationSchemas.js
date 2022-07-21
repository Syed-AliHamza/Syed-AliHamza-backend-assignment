import Joi from 'joi';

export const userLoginSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().required(),
});

export const userSignUpSchema = Joi.object()
  .keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(6).required(),
  })
  .unknown(true);
