import { NextApiRequest, NextApiResponse } from 'next';
import config from './config';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (config.fail) {
    throw new Error('Fail!');
  }
  return new Promise((resolve) => setTimeout(resolve, config.delay));
}
