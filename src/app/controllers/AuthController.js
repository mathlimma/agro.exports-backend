import User from '../models/User';

class AuthController {
  async store(req, res) {
    const {
      fullname,
      email,
      photo_url,
      facebook_id = null,
      google_id = null,
    } = req.body;

    // user logged using facebook
    if (facebook_id !== null) {
      const user = await User.findOne({ facebook_id });

      // if first login -> register user
      if (!user) {
        const emailExist = await User.findOne({ email });

        if (emailExist) {
          return res.status(400).json({
            error: 'User used google to signIn or facebook_id invalid',
          });
        }

        const newUser = await User.create({
          fullname,
          email,
          photo_url,
          facebook_id,
        });

        return res.json({ newUser, token: newUser.generate_token() });
      }
      // user login
      return res.json({ user, token: user.generate_token() });
    }

    // user logged using google
    const user = await User.findOne({ google_id });
    // if first login -> register user
    if (!user) {
      const emailExist = await User.findOne({ email });

      if (emailExist) {
        return res
          .status(400)
          .json({ error: 'User used facebook to signIn or google_id invalid' });
      }

      const newUser = await User.create({
        fullname,
        email,
        photo_url,
        google_id,
      });

      return res.json({ newUser, token: newUser.generate_token() });
    }
    // user login
    return res.json({ user, token: user.generate_token() });
  }
}

export default new AuthController();
