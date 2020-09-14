export interface User {
  name: string;
  image: string;
}

export interface Comment {
  content: string;
  author: User;
}

export interface Post {
  title: string;
  link: string;
  upvotes: number;
  comments: Comment[];
}

// Thanks to randomuser.me
export const users: User[] = [
  {
    name: 'Evelyn Nelson',
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
  },
  {
    name: 'Kenzi Martin',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
  },
  {
    name: 'Edward Wright',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
];

export const posts: { [key: string]: Post } = {
  1: {
    title: 'My 5 Practical CSS Tips',
    link: 'https://daily.dev/posts/my-5-practical-css-tips',
    upvotes: 0,
    comments: [
      {
        content: 'Great article!',
        author: users[0],
      },
      {
        content: 'I love these tips 🦄',
        author: users[1],
      },
    ],
  },
};
