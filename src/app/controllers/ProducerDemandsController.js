import Producer from '../models/Producer';

class ProducerDemandsController {
  async show(req, res) {
    const producer = await Producer.findById(req.params.id);

    return res.json(producer);
  }

  async index(req, res) {
    const producer = await Producer.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });

    return res.json(producer);
  }
}

export default new ProducerDemandsController();
