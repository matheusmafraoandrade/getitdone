const functions = require("firebase-functions");
const admin = require("firebase-admin");

if (admin.apps.length === 0) {
  admin.initializeApp();
}

exports.onTeamCreate = functions.firestore
  .document("teams/{teamId}")
  .onCreate(async (snap, context) => {
    const teamId = context.params.teamId;
    const value = snap.data();

    console.log(teamId);

    return null;
  });
