import Producer from '../models/Producer';
import Supply from '../models/Supply';
import Ece from '../models/Ece';
import Demand from '../models/Demand';
import Notification from '../models/Notification';

class NegociationController {
  async store(req, res) {
    const supply = await Supply.findById(req.params.supply_id);
    const producer = await Producer.findById(supply.producer_id);

    producer.demands_id.push(req.body.demand_id);
    await producer.save();

    return res.json(producer);
  }

  async delete(req, res) {
    const { accept } = req.query;
    const supply = await Supply.findById(req.params.supply_id);

    if (!supply) return res.json({ error: 'Oferta nao existe' });

    if (req.type !== 'Producer')
      return res.json({
        error: 'Apenas produtores podem aceitar/rejeitar uma demanda',
      });

    const producer = await Producer.findById(req.userId);

    const index = producer.demands_id.indexOf(req.body.demand_id);

    if (index === -1) {
      return res.json({
        error: 'Demanda não encontrada',
      });
    }

    producer.demands_id.splice(index, 1);
    await producer.save();

    const demand = await Demand.findById(req.body.demand_id);
    const ece = await Ece.findById(demand.ece_id);
    let description = null;

    if (accept) {
      description = `${producer.name} aceitou seu pedido de negociação`;
    } else {
      description = `${producer.name} recusou seu pedido de negociação`;
    }

    let data = { description };
    if (accept) data = { ...data, tel: producer.tel };

    const notification = await Notification.create(data);
    await notification.sendNotification(ece.push_token);

    return res.json({ success: true });
  }
}

export default new NegociationController();
