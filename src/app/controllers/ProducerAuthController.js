import Producer from '../models/Producer';

class ProducerAuthController {
  async signup(req, res) {
    const { email } = req.body;

    if (await Producer.findOne({ email }))
      return res.status(400).json({ error: 'usuario já existe' });

    const producer = await Producer.create(req.body);
    return res.json({ producer, token: producer.generateToken() });
  }

  async signin(req, res) {
    const { email, password } = req.body;
    const producer = await Producer.findOne({ email }).populate('avatar_id');

    if (!producer) res.status(400).json({ error: 'email não cadastrado' });
    if (!(await producer.compareHash(password)))
      res.status(400).json({ error: 'senha incorreta' });

    return res.json({
      producer: {
        _id: producer._id,
        name: producer.name,
        email: producer.email,
        cpf: producer.cpf,
        avatar_url: producer.avatar_id ? producer.avatar_id.url : null,
      },
      token: producer.generateToken(),
    });
  }
}

export default new ProducerAuthController();
