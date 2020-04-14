import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

//https://us-central1-freeytmusic.cloudfunctions.net/helloWorld

export const helloWorld = functions.https.onRequest((request, response) => {
    console.log("YEY!");
 response.send("Hello from Firebase!haha");
});
