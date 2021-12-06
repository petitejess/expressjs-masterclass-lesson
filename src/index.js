// Setup .env
const  dotenv = require('dotenv');
dotenv.config();
const express = require('express');
// Initialize Express as an instance named "app".
const app = express();  // a server instance

// Separate these out in case we wanna use Docker or something to wrap the app.
// const PORT = 3000;
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Connect to MongoDB
const {databaseConnector} = require('./database');

const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/expressmongolesson'

databaseConnector(DATABASE_URI).then(() => {

console.log('Database connected, yay!');
}).catch(error => {
console.log(`
Some error occured connecting to the database. It was:
${error}
`)
})

// Setup Firebase
const firebaseAdmin = require('firebase-admin');
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS))
});  // initialise app

// Testing out .env
console.log(`Env var message was: ${process.env.NICE_MESSAGE}`);

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

const importedUserRouting = require('./users/userRoutes');
app.use('/users', importedUserRouting);

// Run the server by making it 'listen' for network traffic
app.listen(PORT, HOST, () => {
    // Weird in-line conditional string interpolation to handle "0.0.0.0" -> "localhost" conversion
    console.log(`Server listening at http://${HOST == "0.0.0.0" && "localhost"}:${PORT}/`);
});
