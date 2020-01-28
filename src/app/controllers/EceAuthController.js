import Ece from '../models/Ece';

class EceAuthController {
  async signup(req, res) {
    const { email } = req.body;

    if (await Ece.findOne({ email }))
      return res.status(400).json({ error: 'usuario já existe' });

    const ece = await Ece.create(req.body);
    return res.json({ ece, token: ece.generateToken() });
  }

  async signin(req, res) {
    const { email, password } = req.body;
    const ece = await Ece.findOne({ email });

    if (!ece) res.status(400).json({ error: 'email não cadastrado' });
    if (!(await ece.compareHash(password)))
      res.status(400).json({ error: 'senha incorreta' });

    return res.json({ ece, token: ece.generateToken() });
  }
}

export default new EceAuthController();
