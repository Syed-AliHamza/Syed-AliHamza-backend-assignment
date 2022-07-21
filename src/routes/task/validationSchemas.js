import Joi from 'joi';

export const createTaskSchema = Joi.object().keys({
  name: Joi.string().required(),
});
