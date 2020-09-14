import { NextApiRequest, NextApiResponse } from 'next';
import { Comment, posts } from '../../../../db';

export default (req: NextApiRequest, res: NextApiResponse<Comment>) => {
  const post = posts[req.query.id as string];
  if (post) {
    const comment = req.body as Comment;
    post.comments.push(comment);
    res.status(200).json(comment);
  } else {
    res.status(404).end();
  }
};
