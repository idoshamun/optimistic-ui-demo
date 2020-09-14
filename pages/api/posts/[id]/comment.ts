import { NextApiRequest, NextApiResponse } from 'next';
import { Comment, posts } from '../../../../db';
import configMiddleware from '../../../../configMiddleware';

export default async (req: NextApiRequest, res: NextApiResponse<Comment>) => {
  await configMiddleware(req, res);
  const post = posts[req.query.id as string];
  if (post) {
    const comment = req.body as Comment;
    post.comments.push(comment);
    res.status(200).json(comment);
  } else {
    res.status(404).end();
  }
};
