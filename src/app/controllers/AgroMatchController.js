import Demand from '../models/Demand';
import AgroMatchInitDemand from '../../agromatch';

class AgroMatchController {
  async init(req, res) {
    const demand = await Demand.findById(req.params.demand_id);

    if (demand === null) return res.json({ error: 'Demanda não encontrada' });
    await AgroMatchInitDemand(demand);

    return res.json({ success: true });
  }
}

export default new AgroMatchController();
