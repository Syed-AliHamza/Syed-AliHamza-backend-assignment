import Joi from 'joi';
import express from 'express';
import models from '../../models';
import { STATUS_CODES } from '../../utils/constants';
import { getTaskById } from './query';

import { BadRequestError, getErrorMessages, SuccessResponse } from '../../utils/helper';
import { createTaskSchema } from './validationSchemas';

const { Task } = models;
class TaskController {
  static router;

  static getRouter() {
    this.router = express.Router();
    this.router.get('/', this.list);
    this.router.post('/create', this.createTask);
    return this.router;
  }

  static async list(req, res) {
    const tasks = await Task.findAndCountAll();
    return SuccessResponse(res, tasks);
  }

  static async createTask(req, res, next) {
    const { body: taskPayload } = req;
    try {
      const result = Joi.validate(taskPayload, createTaskSchema);
      if (result.error) {
        BadRequestError(getErrorMessages(result), STATUS_CODES.INVALID_INPUT);
      }

      const taskExist = await Task.findOne(getTaskById({ name: taskPayload.name }));
      if (!taskExist) {
        const task = await Task.create(taskPayload);
        return SuccessResponse(res, task);
      }
      BadRequestError(`Task with name "${taskPayload.name}" already exists`);
    } catch (e) {
      next(e);
    }
  }
}

export default TaskController;
