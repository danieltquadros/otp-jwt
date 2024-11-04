import { RequestHandler, Response } from 'express';
import { ExtendedRequest } from '../types/extended-request';
import { getUserByIdService } from '../services/user';

export const ping: RequestHandler = async (
  req: ExtendedRequest,
  res: Response,
) => {
  if (!req.userId) {
    res.status(401).json({ error: 'access denied.' });
    return;
  }

  const user = await getUserByIdService(req.userId);

  if (!user) {
    res.status(401).json({ error: 'access denied.' });
    return;
  }

  res.json({ user });
};
