import Ece from '../models/Ece';
import Producer from '../models/Producer';

class PushTokenController {
  async store(req, res) {
    const { token } = req.params;

    if (req.type === 'Ece') {
      const ece = await Ece.findById(req.userId);
      ece.push_token = token;
      await ece.save();

      return res.json(ece);
    }
    const producer = await Producer.findById(req.userId);
    producer.push_token = token;
    await producer.save();

    return res.json(producer);
  }
}

export default new PushTokenController();
