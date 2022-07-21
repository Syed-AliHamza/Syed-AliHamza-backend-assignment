import Joi from 'joi';
import passport from 'passport';
import express from 'express';
import models from '../../models';
import { STATUS_CODES } from '../../utils/constants';
import { BadRequest } from '../../error';
import { getUserByIdQuery } from './query';

import {
  BadRequestError,
  generateHash,
  generateJWT,
  getErrorMessages,
  getPassportErrorMessage,
  SuccessResponse,
} from '../../utils/helper';
import { userLoginSchema, userSignUpSchema } from './validationSchemas';

const { User } = models;
class UserController {
  static router;

  static getRouter() {
    this.router = express.Router();
    this.router.post('/resgister', this.register);
    this.router.post('/login', this.login);
    this.router.get('/:id', this.getUserById);
    return this.router;
  }

  static async getUserById(req, res, next) {
    const {
      params: { id },
    } = req;

    try {
      if (!id) {
        BadRequestError(`User id is required`, STATUS_CODES.INVALID_INPUT);
      }
      const query = getUserByIdQuery({ id });
      const user = await User.findOne(query);
      return SuccessResponse(res, user);
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    const { body: user } = req;

    const result = Joi.validate(user, userLoginSchema, { abortEarly: true });
    if (result.error) {
      return next(new BadRequest(getErrorMessages(result), STATUS_CODES.INVALID_INPUT));
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const userObj = {
          id: passportUser.id,
          email: passportUser.email,
          token: generateJWT(passportUser),
        };
        return SuccessResponse(res, userObj);
      }
      return next(new BadRequest(getPassportErrorMessage(info), STATUS_CODES.INVALID_INPUT));
    })(req, res, next);
  }

  static async register(req, res, next) {
    const { body: userPayload } = req;
    try {
      const result = Joi.validate(userPayload, userSignUpSchema);
      if (result.error) {
        BadRequestError(getErrorMessages(result), STATUS_CODES.INVALID_INPUT);
      }
      const query = {
        where: {
          email: userPayload.email,
        },
      };

      const userExists = await User.findOne(query);
      if (!userExists) {
        userPayload.password = generateHash(userPayload.password);
        const user = await User.create(userPayload);
        const userResponse = user.toJSON();
        delete userResponse.password;
        return SuccessResponse(res, userResponse);
      }
      BadRequestError(`User "${userPayload.email}" already exists`);
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;
