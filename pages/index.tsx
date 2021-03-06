import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Comment, Post, posts, User, users } from '../db';
import { GetServerSidePropsResult } from 'next';
import { useState } from 'react';
import cloneDeep from 'lodash.clonedeep';

interface Props {
  user: User;
  post: Post;
}

export function getServerSideProps(): GetServerSidePropsResult<Props> {
  return {
    props: {
      post: Object.values(posts)[0],
      user: users[Math.floor(Math.random() * users.length)],
    },
  };
}

async function sendRequest<T>(url: string, opts: RequestInit): Promise<T> {
  const res = await fetch(url, opts);
  if (res.status >= 400) {
    throw new Error('Unexpected error');
  }
  if (res.status === 200) {
    return res.json();
  }
  return null;
}

const sendUpvote = (postId: string): Promise<void> =>
  sendRequest(`/api/posts/${postId}/upvote`, {
    method: 'POST',
  });

const sendComment = (postId: string, comment: Comment): Promise<Comment> =>
  sendRequest(`/api/posts/${postId}/comment`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

const commentsBank = [
  'I hate CSS 😡',
  'Awesome tips 🤯',
  'I want more! 🔥',
  'Highly recommended 👀',
];

interface Failure {
  description: string;
  retry: () => Promise<void>;
}

export default function Home({ post: originalPost, user }: Props) {
  const [post, setPost] = useState<Post>(originalPost);
  const [failure, setFailure] = useState<Failure>(null);

  async function runOptimisticOperation<T>(
    operation: () => Promise<T>,
    optimisticUpdate: () => void,
    failureDescription: string,
    actualUpdate?: (res: T) => void,
  ): Promise<void> {
    const oldPost = cloneDeep(post);
    try {
      setFailure(null);
      optimisticUpdate();
      const res = await operation();
      actualUpdate?.(res);
    } catch (err) {
      setPost(oldPost);
      setFailure({
        description: failureDescription,
        retry: () =>
          runOptimisticOperation(
            operation,
            optimisticUpdate,
            failureDescription,
            actualUpdate,
          ),
      });
    }
  }

  const upvote = async (): Promise<void> =>
    runOptimisticOperation(
      () => sendUpvote(post.id),
      () => setPost({ ...post, upvotes: post.upvotes + 1 }),
      'Failed to upvote',
    );

  const comment = async (content: string): Promise<void> => {
    const localComment = {
      author: user,
      content,
    };
    return runOptimisticOperation(
      () => sendComment(post.id, localComment),
      () => setPost({ ...post, comments: [...post.comments, localComment] }),
      'Failed to comment',
      (newComment) =>
        setPost({ ...post, comments: [...post.comments, newComment] }),
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Optimistic UI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.userName}>{user.name}</div>
        <img
          className={styles.profileImage}
          src={user.image}
          alt="Your profile picture"
        />
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>{post.title}</h1>
        <img className={styles.postImage} src={post.image} alt="Post image" />
        <div className={styles.buttons}>
          <button className={styles.button} onClick={upvote}>
            Upvote ({post.upvotes})
          </button>
          <button
            className={styles.button}
            onClick={() =>
              comment(
                commentsBank[Math.floor(Math.random() * commentsBank.length)],
              )
            }
          >
            Comment
          </button>
        </div>
        {post.comments.map((comment, index) => (
          <article key={index} className={styles.comment}>
            <img
              className={styles.commentProfileImage}
              src={comment.author.image}
              alt="Profile picture"
            />
            <div className={styles.commentInfo}>
              <div className={styles.commentAuthor}>{comment.author.name}</div>
              <div>{comment.content}</div>
            </div>
          </article>
        ))}
      </main>
      {failure && (
        <div className={styles.alert}>
          <span>{failure.description}</span>
          <button className={styles.retryButton} onClick={failure.retry}>
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
