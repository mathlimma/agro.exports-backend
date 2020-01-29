import Supply from '../models/Supply';

class SupplyController {
  async store(req, res) {
    const supply = await Supply.create({
      ...req.body,
      producer_id: req.userId,
    });

    return res.json(supply);
  }
}

export default new SupplyController();
