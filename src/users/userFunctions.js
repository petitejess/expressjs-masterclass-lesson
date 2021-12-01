// Require then initialise
const firebaseClient = require('firebase/app');
firebaseClient.initializeApp(JSON.parse(process.env.FIREBASE_CLIENT_CONFIG));  // initialise

// Already initialised in index.js, just requiring here
const firebaseAdmin = require('firebase-admin');

// signUpUser({ username: "Something", email: "something@web.com", password: "Pass123" })
async function signUpUser(userDetails){
  return firebaseAdmin.auth().createUser({
      email: userDetails.email,
      password: userDetails.password,
      displayName: userDetails.username,
      emailVerified: true,
      // photoURL: "somefreestockwebsite.com/image/someimage.png"
  }).then(async (userRecord) => {
      // Set a "custom claim", or authorization/role data 
      let defaultUserClaims = firebaseAdmin.auth().setCustomUserClaims(userRecord.uid, {admin:false, regularUser:true}).then(() => {
          console.log("Set default claims to the new user.");
      });

      return userRecord;
  }).catch(error => {
      console.log(`Internal sign-up function error is:\n${error}`);
      return {error:error};
  });
}

module.exports = {
  signUpUser
};
