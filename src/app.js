import express from 'express';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {}

  routes() {}
}

export default new App().server;
