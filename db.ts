export interface User {
  name: string;
  image: string;
}

export interface Comment {
  content: string;
  author: User;
}

export interface Post {
  id: string;
  title: string;
  image: string;
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
    id: '1',
    title: 'My 5 Practical CSS Tips',
    image:
      'https://assets.website-files.com/5e0f1144930a8bc8aace526c/5f5781a139a480750a05c35b_sam-dan-truong--rF4kuvgHhU-unsplash.jpg',
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
