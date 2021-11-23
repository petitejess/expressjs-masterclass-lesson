const express = require('express');
// Initialize Express as an instance named "app".
const app = express();  // a server instance

// Separate these out in case we wanna use Docker or something to wrap the app.
// const PORT = 3000;
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Best settings for setting up Express as an API server to receive and process JSON & form data.
app.use(express.json());
app.use(express.urlencoded({extended:true}));  // for form data

// Standard ExpressJS route, sends back a HTML response
app.get('/', (request, response) => {

    // response.send("Today, my life resumes...");

    // Send response as json
    response.json({message: "Today, my life resumes..."});
});

// Routing
const importedPostRouting = require('./posts/postRoutes');  // Only imports the router
app.use('/posts', importedPostRouting);  // Tell server to use the router (attach it to the server)

// Run the server by making it 'listen' for network traffic
app.listen(PORT, HOST, () => {
    // Weird in-line conditional string interpolation to handle "0.0.0.0" -> "localhost" conversion
    console.log(`Server listening at http://${HOST == "0.0.0.0" && "localhost"}:${PORT}/`);
});
