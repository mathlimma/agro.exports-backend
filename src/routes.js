import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

import ProducerAuthController from './app/controllers/ProducerAuthController';
import EceAuthController from './app/controllers/EceAuthController';
import ProducerController from './app/controllers/ProducerController';
import EceController from './app/controllers/EceController';
import AvatarController from './app/controllers/AvatarController';
import NegociationController from './app/controllers/NegociationController';
import SupplyPhotoController from './app/controllers/SupplyPhotoController';
import SupplyController from './app/controllers/SupplyController';
import DemandController from './app/controllers/DemandController';
import ProducerDemandsController from './app/controllers/ProducerDemandsController';
import ProductController from './app/controllers/ProductController';
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

    // producer
    this.router.get('/producer/:id', ProducerController.show);
    this.router.put('/producer', ProducerController.update);

    // Ece
    this.router.get('/ece/:id', EceController.show);
    this.router.put('/ece', EceController.update);

    // product
    this.router.post('/product', ProductController.store);
    this.router.get('/product', ProductController.index);

    // supply
    this.router.post('/supply', SupplyController.store);
    this.router.put('/supply/:id', SupplyController.update);
    this.router.get('/supply/:id', SupplyController.show);

    // demand
    this.router.get('/demand/:id', DemandController.show);
    this.router.post('/demand', DemandController.store);
    this.router.put('/demand/:id', DemandController.update);
    this.router.delete('/demand/:id', DemandController.delete);
    this.router.get(
      '/demand/:demand_id/supplies',
      DemandSuppliesController.index
    );

    // producer_product
    this.router.post(
      '/producer/product/:product_id',
      ProducersProductController.store
    );
    this.router.get('/producer/product', ProducersProductController.index);

    // producer_demands
    this.router.get(
      '/producer/demand/:demand_id',
      ProducerDemandsController.show
    );
    this.router.get('/producer/demand', ProducerDemandsController.index);

    // negociation
    this.router.put(
      '/negociation/producer/:producer_id',
      NegociationController.pushDemandId
    );
    this.router.delete(
      '/negociation/producer/:producer_id',
      NegociationController.deleteDemandId
    );
  }
}

export default new Routes().router;
