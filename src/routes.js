import { Router } from 'express';

class Routes {
  constructor() {
    this.router = Router();

    this.middlewares();
    this.routes();
  }

  middlewares() {}

  routes() {
    this.router.get('/', (req, res) => res.json({ Hello: 'World' }));
  }
}

export default new Routes().router;
