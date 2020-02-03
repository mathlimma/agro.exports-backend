import Demand from '../models/Demand';

class DemandSuppliesController {
  async index(req, res) {
    const demandSupplies = await Demand.findById(req.params.demand_id).populate(
      {
        path: 'supplies_id',
        model: 'Supply',
        populate: [
          {
            path: 'producer_id',
            model: 'Producer',
            populate: {
              path: 'avatar_id',
              model: 'File',
            },
          },
          {
            path: 'photos',
            model: 'File',
          },
        ],
      }
    );

    return res.json(demandSupplies);
  }
}

export default new DemandSuppliesController();
