import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'no Token provided' });
  }

  const authHeader = authorization.split(' ');

  if (authHeader.length !== 2) {
    return res.status(400).json({ error: 'Token mal formatted' });
  }

  const [bearer, token] = authHeader;

  if (bearer !== 'Bearer') {
    return res.status(400).json({ error: 'Bearer not provide' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(400).json({ error: 'Token does not match' });
  }
};
