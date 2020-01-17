import { Router } from 'express';
import AuthController from './app/controllers/AuthController';

class Routes {
  constructor() {
    this.router = Router();

    this.middlewares();
    this.routes();
  }

  middlewares() {}

  routes() {
    this.router.post('/auth', AuthController.store);
  }
}

export default new Routes().router;
