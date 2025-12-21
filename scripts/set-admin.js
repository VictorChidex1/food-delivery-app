const admin = require("firebase-admin");
const serviceAccount = require("../service-account.json"); // You will need to download this from Firebase Console

// NOTE: Since the user might not have a service account key conveniently placed,
// and we want a quick "dev" way to do this without setting up full Backend Admin SDK env if not present:
// We can actually just instruct them to edit it in Firestore Console manually for the MVP,
// OR we can use the client SDK with a temporary "allow all write" rule? NO, that's insecure.
//
// BETTER APPROACH for this context:
// Since this is a client-side app repo, adding a node script that requires a service account key
// (which they don't have in the repo) might be confusing.
//
// HOWEVER, I promised a script.
// I will write a script that uses the CLIENT SDK but requires you to be logged in?
// No, Node.js client SDK doesn't work like that easily without Auth.
//
// REVISED PLAN: I will create a small "Hidden" component or just a function they can call from the Console
// if I want to be 100% client side.
// BUT, the robustness of "set-admin.js" normally implies Admin SDK.
//
// Let's write the standardized Admin SDK script and instruct them to get the key if they want to use it.
// OR, I can create a temporary "SetupAdmin" page for them?
//
// Actually, the EASIEST way for a user who already has the app running:
// I will create a temporary "Secret" function in the app they can trigger,
// OR simpler: I will provide the script but add comments on how to get the key.

// Wait, I don't want to block them on "Get Service Account Key".
// I will provide a script that uses the existing 'firebase-admin' if they have it? They likely don't.
//
// LET'S DATA MIGRATION STYLE IT:
// I'll create a script `scripts/set-admin.js` that uses the *Client* SDK but
// requires a temporary loosening of rules? No.
//
// Let's go with the standard "You need a service account" approach, it's the professional way.

// ...Wait, I can't easily install `firebase-admin` without `npm install`.
// I'll assume they can run `npm install firebase-admin` or I'll provide a client-side "Super Secret"
// way to do it during development (e.g. a temporary rule change).
//
// Let's stick to the Admin SDK script and I'll ask them to install the package if needed.

/*
  PREREQUISITES:
  1. npm install firebase-admin
  2. Go to Firebase Console -> Project Settings -> Service Accounts -> Generate New Private Key
  3. Save the file as 'service-account.json' in this 'scripts' folder.
*/

if (
  !process.env.GOOGLE_APPLICATION_CREDENTIALS &&
  !require("fs").existsSync("./scripts/service-account.json")
) {
  console.error(
    "ERROR: standard service-account.json not found in scripts/ folder."
  );
  console.log(
    "Please download your Service Account Key from Firebase Console and save it as 'scripts/service-account.json'"
  );
  process.exit(1);
}

// ... actually, I'll write a script that uses the PROJECT CONFIG and prompts for email,
// but it can't write to 'role' if rules forbid it!
// Catch-22: You need to be admin to make someone admin.
//
// DATA BOOTSTRAP:
// I will provide a script that they can run *locally* if they have the credentials.
// Or I'll just tell them to use the Firestore Console manually.
//
// User explicitly asked "how you intend to do this" and I said "I will create a script".
// So I must create the script. `firebase-admin` is the way.

const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccountPath = "./service-account.json";

try {
  const serviceAccount = require(serviceAccountPath);

  initializeApp({
    credential: cert(serviceAccount),
  });

  const db = getFirestore();
  const email = process.argv[2];

  if (!email) {
    console.log("Usage: node scripts/set-admin.js <email>");
    process.exit(1);
  }

  const setAdmin = async () => {
    console.log(`Looking for user with email: ${email}...`);
    const usersRef = db.collection("users");
    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot.forEach(async (doc) => {
      await doc.ref.update({ role: "admin" });
      console.log(`User ${email} (ID: ${doc.id}) promoted to ADMIN.`);
    });
  };

  setAdmin();
} catch (e) {
  console.error(
    "Error: Could not load service-account.json or firebase-admin not installed."
  );
  console.error("1. npm install firebase-admin");
  console.error(
    "2. Download service account key to scripts/service-account.json"
  );
}
