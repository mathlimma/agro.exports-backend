import Ece from '../models/Ece';

class EceController {
  async show(req, res) {
    const ece = await Ece.findById(req.params.id);

    return res.json(ece);
  }

  async update(req, res) {
    const ece = await Ece.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });

    return res.json(ece);
  }
}

export default new EceController();
