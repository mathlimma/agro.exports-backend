import Ece from '../models/Ece';

class ProducerController {
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

  // given a jwt web token returns the specific user
  async userByToken(req, res) {
    const products = await Ece.find({});

    return res.json(products);
  }
}

export default new ProducerController();
