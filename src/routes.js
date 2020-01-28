import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

import ProducerAuthController from './app/controllers/ProducerAuthController';
import EceAuthController from './app/controllers/EceAuthController';
import FileController from './app/controllers/FileController';

const upload = multer(multerConfig);

class Routes {
  constructor() {
    this.router = Router();
    this.auth();
    this.middlewares();
    this.routes();
  }

  auth() {
    this.router.post('/producer/signup', ProducerAuthController.signup);
    this.router.post('/producer/signin', ProducerAuthController.signin);

    this.router.post('/ece/signup', EceAuthController.signup);
    this.router.post('/ece/signin', EceAuthController.signin);
  }

  middlewares() {
    this.router.use(authMiddleware);
  }

  routes() {
    this.router.put('/avatar', upload.single('file'), FileController.store);
  }
}

export default new Routes().router;
