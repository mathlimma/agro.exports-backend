import { Router } from 'express';
import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

class Routes {
  constructor() {
    this.router = Router();

    this.middlewares();
    this.routes();
  }

  middlewares() {}

  routes() {
    this.router.post('/auth', AuthController.store);

    this.router.get('/user/:email', UserController.show);
    this.router.put('/user', UserController.update);
    this.router.delete('/user', UserController.delete);

    this.router.get('/users', UserController.index);
  }
}

export default new Routes().router;
