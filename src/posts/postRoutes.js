const { request } = require('express');
const express = require('express');
const { randomNumberGenerator, someAsyncFunction } = require('./postsFunctions');

// Create a bundle of routes. We'll export this out and then import it into src/index.js.
const routes = express.Router();

// This is the "root" route for the Router instance. 
// Its actual name in the URL will depend on how it's configured in src/index.js
routes.get('/', (request, response) => {

    response.json(`Received a request on ${request.originalUrl}`);
});

// Testing functions
routes.get('/randomNumber', (request, response) => {
  // response.send(randomNumberGenerator().toString());
  response.send(`<h1>Our random number: ${randomNumberGenerator()}</h1>`);
});

// // Example of async func
// routes.get('/randomNumber', async(request, response) => {
//   let asyncResult = await someAsyncFunction();
//   response.send(randomNumberGenerator().toString());
// });

// Set up route params with the colon before the name.
routes.get('/:postID', (request, response) => {

    response.json(`Received a GET request for a post with ID of ${request.params.postID}`);

});

// // Extra params
// routes.get('/:postID/:extraParams', (request, response) => {

//   response.json(`Received a GET request for a post with ID of ${request.params.extraParams}`);

// });

// Use Postman or another HTTP tool to visit a POST route.
routes.post('/:postID', (request, response) => {
  // response.json(`Received a POST request for a post with ID of ${request.params.postID}`);

  let submittedData = request.body;
  let submittedName = request.body.name.toUpperCase();
  let submittedPokemon = request.body.favouritePokemon.name;

  // Can do sanitising etc before saving to DB
  submittedData += submittedName;
  submittedData += submittedPokemon;

  console.log(JSON.stringify(submittedData));

  // response.json(`Received ${request.body.name}!!`);
  // response.json(`Received body ${JSON.stringify(request.body)}, submitted name is ${JSON.stringify(request.body.name)}!!`);
  response.json(`Received body ${submittedData}, submitted name is ${submittedName}, submitted fav Pokemon is ${submittedPokemon}!!`);
});

module.exports = routes;
