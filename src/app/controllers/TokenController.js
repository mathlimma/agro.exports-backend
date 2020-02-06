import Producer from '../models/Producer';
import Ece from '../models/Ece';

class TokenController {
  async show(req, res) {
    if (req.type === 'Ece') {
      const ece = await Ece.findById(req.userId).populate({
        path: 'avatar_id',
        model: 'File',
      });

      return res.json(ece);
    }

    const producer = await Producer.findById(req.userId).populate({
      path: 'avatar_id',
      model: 'File',
    });

    return res.json(producer);
  }
}

export default new TokenController();
