import Demand from '../models/Demand';

class DemandController {
  async store(req, res) {
    const demand = await Demand.create(req.body);

    res.json(demand);
  }

  async update(req, res) {
    const demand = await Demand.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    res.json(demand);
  }
}

export default new DemandController();
