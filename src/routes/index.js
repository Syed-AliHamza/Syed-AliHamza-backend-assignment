import express from 'express';
import auth from '../middlewares/auth';
import UserController from './user/user.controller';

const router = express.Router();

// list of routes to be excluded from authentication and authorization
const aclExcludedRoutes = [
  '/api/users/googleLogin',
  '/api/users/login',
  '/api/users/register',
  /^\/api-docs\/.*/,
];

router.use(auth.required.unless({ path: aclExcludedRoutes }));

router.use('/users', UserController.getRouter());

export default router;
