import { NextApiRequest, NextApiResponse } from 'next';
import { Post, posts } from '../../../../db';

export default (req: NextApiRequest, res: NextApiResponse<Post>) => {
  const post = posts[req.query.id as string];
  if (post) {
    post.upvotes += 1;
    res.status(200).json(post);
  } else {
    res.status(404).end();
  }
};
