const admin = require("firebase-admin");

const serviceAccount = require("../config/fbServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-commerce-f6dad.firebaseio.com",
});

module.exports = admin;
