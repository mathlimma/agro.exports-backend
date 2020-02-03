import Producer from '../models/Producer';

class NegociationController {
  async pushDemandId(req, res) {
    const producer = await Producer.findById(req.params.producer_id);

    producer.demands_id.push(req.body.demand_id);
    await producer.save();

    return res.json(producer);
  }

  async deleteDemandId(req, res) {
    const producer = await Producer.findById(req.params.producer_id);

    const index = producer.demands_id.indexOf(req.body.demand_id);

    if (index === -1) {
      return res.json({
        error: 'Demanda não encontrada',
      });
    }

    producer.demands_id.splice(index, 1);
    await producer.save();

    return res.json({ success: true });
  }
}

export default new NegociationController();
