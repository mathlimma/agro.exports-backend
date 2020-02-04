import Product from '../models/Product';
import File from '../models/File';

class ProductPhotoController {
  async store(req, res) {
    const file = await File.create({
      name: req.file.filename,
    });

    const product = await Product.findById(req.params.id);
    product.photo_id = file._id;
    await product.save();

    return res.json(product);
  }
}

export default new ProductPhotoController();
