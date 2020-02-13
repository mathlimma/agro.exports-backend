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
      description,
    } = req.body;
    const location = {
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
      description,
    });

    return res.json(demand);
  }

  async show(req, res) {
    const demand = await Demand.findById(req.params.id)
      .select(
        'price ece_id product_id description kg_amount max_distance_km createdAt updatedAt'
      )
      .populate({
        path: 'ece_id',
        model: 'Ece',
        select: 'tel name avatar_id description city',
        populate: {
          path: 'avatar_id',
          model: 'File',
          select: 'url name',
        },
      })
      .populate({
        path: 'product_id',
        model: 'Product',
        select: 'photo_id name',
        populate: {
          path: 'photo_id',
          model: 'File',
          select: 'url name',
        },
      });
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
