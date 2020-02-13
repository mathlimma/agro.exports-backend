import Supply from '../models/Supply';

class ProducerSuppliesController {
  async show(req, res) {
    if (req.type === 'Ece')
      return res.status(401).send({
        error: 'Apenas produtores podem ter seus produtos cadastrados',
      });

    const supplies = await Supply.find({ producer_id: req.userId })
      .select('product_id active createdAt price description')
      .sort('-createdAt')
      .populate({
        path: 'product_id',
        model: 'Product',
        select: 'photo_id name',
        populate: {
          path: 'photo_id',
          model: 'File',
          select: 'name url',
        },
      });
    return res.json(supplies);
  }
}

export default new ProducerSuppliesController();
