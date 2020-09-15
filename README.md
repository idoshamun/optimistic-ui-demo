# Optimistic UI Demo

This code is assosicated with my talk about Optimistic UI. You can find the [slides here](https://docs.google.com/presentation/d/1fuySoPxVNVgo6ynQuhbJZCEeugqBuzCqD7JavEsIHjk/edit?usp=sharing).


## About

The project shows the difference ins the user experience between the classic interaction model and Optimistic UI.

It showcases the difference in web page where you can add a comment and upvote an article.

Every time you refresh the page, the server assigns a random user as the logged-in user.
All data is stored in-memory and is cleared once you close the server.
When you click on the comment button the app chooses randomly the content of the comment.

The repository is made of two branches:
* `classic-interaction`
* `optimistic-ui`

## Getting Started

Checkout the branch and you want:
```bash
git checkout classic-interaction
# or
git checkout optimistic-ui
```

Install dependencies:
```bash
npm i
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Configuration

The server can add an artificial delay to the upvote and comment requests and can set to fail.
These two settings highlight the differences between the classic interaction model and Optimistic UI.

To change the configuration, you can send a POST request to `/api/config`.
Example:
```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"delay":1000,"fail":true}' \
  http://localhost:3000/api/config
```
This will set the config to always fail after 1s delay.

By default, the config is to delay response in 1s and to succeed.
