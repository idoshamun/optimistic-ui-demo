import { NextApiRequest, NextApiResponse } from 'next';
import config from './config';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, config.delay));
  if (config.fail) {
    throw new Error('Fail!');
  }
}
