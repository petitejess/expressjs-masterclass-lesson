// CRUD
const {Post} = require('../database/schema/PostSchema');

// Get all posts
async function getAllPosts() {
  let allPosts = await Post.find();
  return JSON.stringify(allPosts);
}

// Create a post
async function createSpecificPost(postDetails) {
  // Do the validation somewhere else, this for happy path
  let newPost = new Post({
    postTitle: postDetails.postTitle,
    postContent: postDetails.postContent,
    postAuthorID: postDetails.postAuthorID,
    postRating: postDetails.postRating
  });

  let creationResult = await newPost.save();
  return creationResult;
}


function randomNumberGenerator() {
  return 3;
}

async function someAsyncFunction() {
  return "some async thing"
}

module.exports = {
  randomNumberGenerator,
  someAsyncFunction,
  getAllPosts,
  createSpecificPost
}