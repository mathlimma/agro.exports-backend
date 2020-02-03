import Demand from '../models/Demand';

class DemandController {
  async store(req, res) {
    const {
      latitude,
      longitude,
      product_id,
      price,
      kg_amount,
      max_distance_km,
    } = req.body;
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    if (req.type !== 'Ece')
      return res
        .status(401)
        .json({ error: 'Apenas Eces podem criar uma demanda' });

    const demand = await Demand.create({
      price,
      kg_amount,
      max_distance_km,
      location,
      product_id,
      ece_id: req.userId,
    });

    return res.json(demand);
  }

  async show(req, res) {
    const demand = await Demand.findByIdAndDelete(req.params.id);
    return res.json(demand);
  }

  async delete(req, res) {
    await Demand.findByIdAndDelete(req.params.id);
    return res.json({ success: true });
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

    const demand = await Demand.findOneAndUpdate({ _id: req.params.id }, data, {
      new: true,
    });

    return res.json(demand);
  }
}

export default new DemandController();
