import Supply from '../models/Supply';

class ProducerSuppliesController {
  async show(req, res) {
    if (req.type === 'Ece')
      return res.status(401).send({
        error: 'Apenas produtores podem ter seus produtos cadastrados',
      });
    console.log(req.userId);
    const supplies = await Supply.find({ producer_id: req.userId }).populate({
      path: 'product_id',
      model: 'Product',
      populate: {
        path: 'photo_id',
        model: 'File',
      },
    });
    return res.json(supplies);
  }
}

export default new ProducerSuppliesController();
