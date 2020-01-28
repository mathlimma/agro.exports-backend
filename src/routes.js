import { Router } from 'express';

class Routes {
  constructor() {
    this.router = Router();

    this.middlewares();
    this.routes();
  }

  middlewares() {}

  routes() {}
}

export default new Routes().router;
