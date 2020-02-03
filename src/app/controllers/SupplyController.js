import Supply from '../models/Supply';
import Producer from '../models/Producer';

class SupplyController {
  async store(req, res) {
    const {
      price,
      description,
      longitude,
      latitude,
      product_id,
      active,
    } = req.body;
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
      active,
    });

    const producer = await Producer.findById(req.userId);

    if (producer.products_id.indexOf(product_id) === -1) {
      producer.products_id.push(product_id);
    }

    return res.json(supply);
  }

  async update(req, res) {
    const { latitude = null, longitude = null } = req.body;
    let data = null;

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    delete req.body.latitude;
    delete req.body.longitude;

    data = { ...req.body };

    if (latitude !== null && longitude !== null) {
      data.location = location;
    }

    const supply = await Supply.findOneAndUpdate({ _id: req.params.id }, data, {
      new: true,
    });

    return res.json(supply);
  }

  async show(req, res) {
    const supply = await Supply.findById(req.params.id);

    return res.json(supply);
  }
}

export default new SupplyController();
