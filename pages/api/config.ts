import { NextApiRequest, NextApiResponse } from 'next';
import config, { Config } from '../../config';

export default (req: NextApiRequest, res: NextApiResponse<Config>) => {
  if (req.body) {
    config.fail = req.body.fail;
    config.delay = req.body.delay;
  }
  res.status(200).json(config);
};
