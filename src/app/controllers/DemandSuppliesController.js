import Demand from '../models/Demand';

class DemandSuppliesController {
  async index(req, res) {
    const demandSupplies = await Demand.findById(req.params.demand_id).populate(
      {
        path: 'supplies_id',
        model: 'Supply',
      }
    );

    return res.json(demandSupplies);
  }
}

export default new DemandSuppliesController();
