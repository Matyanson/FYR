"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
//https://us-central1-freeytmusic.cloudfunctions.net/helloWorld
exports.helloWorld = functions.https.onRequest((request, response) => {
    console.log("YEY!");
    response.send("Hello from Firebase!haha");
});
//# sourceMappingURL=index.js.map