import User from '../models/User';

class UserController {
  async show(req, res) {
    const { email } = req.params;

    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  }

  async index(req, res) {
    const users = await User.find({});
    res.json(users);
  }

  async update(req, res) {
    const { email } = req.query;

    let user = await User.findOne({ email });

    if (user) {
      user = await user.update(req.body);
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  }

  async delete(req, res) {
    const { email } = req.query;

    let user = await User.findOne({ email });

    if (user) {
      user = await user.delete();
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  }
}

export default new UserController();
