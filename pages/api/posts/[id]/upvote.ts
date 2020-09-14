import { NextApiRequest, NextApiResponse } from 'next';
import { Post, posts } from '../../../../db';
import configMiddleware from '../../../../configMiddleware';

export default async (req: NextApiRequest, res: NextApiResponse<Post>) => {
  await configMiddleware(req, res);
  const post = posts[req.query.id as string];
  if (post) {
    post.upvotes += 1;
    res.status(204).end();
  } else {
    res.status(404).end();
  }
};
