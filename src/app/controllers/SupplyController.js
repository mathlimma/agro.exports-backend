import Supply from '../models/Supply';

class SupplyController {
  async store(req, res) {
    const { price, description, longitude, latitude, product_id } = req.body;
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    if (req.type !== 'Producer')
      return res
        .status(401)
        .json({ error: 'Apenas Produtores podem criar uma oferta' });

    const supply = await Supply.create({
      price,
      description,
      producer_id: req.userId,
      location,
      product_id,
    });

    return res.json(supply);
  }
}

export default new SupplyController();
