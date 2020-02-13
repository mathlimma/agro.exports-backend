import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const product = await Product.create(req.body);

    return res.json(product);
  }

  async index(req, res) {
    const products = await Product.find({})
      .select('name createdAt')
      .sort('name')
      .populate({
        path: 'photo_id',
        model: 'File',
        select: 'name url',
      });

    return res.json(products);
  }
}

export default new ProductController();
