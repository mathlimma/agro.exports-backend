import Customer from '../models/Customer';

class CustomerAuthController {
  async signup(req, res) {
    const { email } = req.body;

    if (await Customer.findOne({ email }))
      return res.status(400).json({ error: 'usuario já existe' });

    const customer = await Customer.create(req.body);
    return res.json({ customer, token: customer.generateToken() });
  }

  async signin(req, res) {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email }).populate('avatar_id');

    if (!customer) res.status(400).json({ error: 'email não cadastrado' });
    if (!(await customer.compareHash(password)))
      res.status(400).json({ error: 'senha incorreta' });

    return res.json({
      Customer: {
        _id: customer._id,
        name: customer.name,
        email: customer.email,
        cnpj: customer.cnpj,
        avatar_url: customer.avatar_id ? customer.avatar_id.url : null,
      },
      token: customer.generateToken(),
    });
  }
}

export default new CustomerAuthController();
