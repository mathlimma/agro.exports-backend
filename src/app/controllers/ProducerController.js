import Producer from '../models/Producer';

class ProducerController {
  async show(req, res) {
    const producer = await Producer.findById(req.params.id);

    return res.json(producer);
  }

  async update(req, res) {
    const producer = await Producer.findByIdAndUpdate(req.userId, req.body, {
      new: true,
    });

    return res.json(producer);
  }

  // given a jwt web token returns the specific user
  async userByToken(req, res) {
    const products = await Producer.find({});

    return res.json(products);
  }
}

export default new ProducerController();
