import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

import ProducerAuthController from './app/controllers/ProducerAuthController';
import EceAuthController from './app/controllers/EceAuthController';
import AvatarController from './app/controllers/AvatarController';
import SupplyPhotoController from './app/controllers/SupplyPhotoController';
import SupplyController from './app/controllers/SupplyController';
import DemandController from './app/controllers/DemandController';
import ProducersProductController from './app/controllers/ProducersProductController';
import DemandSuppliesController from './app/controllers/DemandSuppliesController';

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
    this.router.put('/avatar', upload.single('file'), AvatarController.store);
    this.router.post(
      '/supply/:id/photo',
      upload.array('file', 10),
      SupplyPhotoController.store
    );

    this.router.post('/supply', SupplyController.store);
    this.router.put('/supply/:id', SupplyController.update);
    this.router.get('/supply/:id', SupplyController.show);

    this.router.post('/supply', SupplyController.store);

    this.router.post('/demand', DemandController.store);
    this.router.put('/demand/:id', DemandController.update);
    this.router.post(
      '/producer/product/:product_id',
      ProducersProductController.store
    );
    this.router.get('/producer/product', ProducersProductController.index);
    this.router.get(
      '/demand/:demand_id/supplies',
      DemandSuppliesController.index
    );
  }
}

export default new Routes().router;
