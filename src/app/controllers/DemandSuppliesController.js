import Demand from '../models/Demand';

class DemandSuppliesController {
  async index(req, res) {
    const demandSupplies = await Demand.findById(req.params.demand_id)
      .select('producer_id')
      .populate({
        path: 'supplies_id',
        model: 'Supply',
        options: { sort: { created_at: -1 } },
        populate: [
          {
            path: 'producer_id',
            model: 'Producer',
            select: 'avatar_id city name',
            populate: {
              path: 'avatar_id',
              model: 'File',
              select: 'name url',
            },
          },
          {
            path: 'photos',
            model: 'File',
            select: 'name url',
          },
        ],
      });

    return res.json(demandSupplies);
  }
}

export default new DemandSuppliesController();
