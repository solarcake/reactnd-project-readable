# UDACITY BLOG

**Blog interactions for udacity second project**

## Prerequisites

* NPM and Nodejs https://nodejs.org/en/
* Udacity blog backend. Clone https://github.com/udacity/reactnd-project-readable-starter.git and run npm install in directory
* Udacity blog front end Clone https://github.com/solarcake/reactnd-project-readable.git and run npm install in the cloned directory

## Getting Started
* Bring up udacity backend cloned in the prerequities section. Run npm start in the main directory
* Verify backend server is up by going to http://localhost:3001
* Bring up udacity frontend cloned in the prerequities section. Run npm start in the main directory
* Verify the front end server is up by going to http://localhost:3000

## End Points

* / - Lists all categories and posts (To add more categories modify categories.js in the blog backend, a server restart is necessary)

* /post/{postId}- edit a post with a given post id

* /post - add a new post

* /category/{categoryName} - List all posts for a given category

* /comment/{postId}/{commentId} -] Edit an existing post where postId is the post id and commentId is the comment id against the post
         
* /comment/:postId - Add a new comment against the post

## Other features

* You may up vote and down vote both comments and posts on the post and comment lists.
