import Demand from '../models/Demand';
import AgroMatchInitDemand from '../../agromatch';

class AgroMatchController {
  async init(req, res) {
    const demand = await Demand.findById(req.params.demand_id);

    const agromatch = await AgroMatchInitDemand(demand);
    demand.supplies_id = agromatch.supplies;
    await demand.save();
    return res.json({ success: true });
  }
}

export default new AgroMatchController();
