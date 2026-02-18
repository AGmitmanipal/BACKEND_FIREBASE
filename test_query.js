const { db } = require('./config/firebase');

async function testPendingUsers() {
    try {
        const usersRef = db.collection('users');
        // Firestore: approved == false
        const snapshot = await usersRef.where('approved', '==', false).get();

        console.log("PENDING_USERS_TEST_SUCCESS");
        console.log(`Found ${snapshot.size} users.`);
    } catch (err) {
        console.log("PENDING_USERS_TEST_ERROR");
        console.error(err);
    } finally {
        process.exit();
    }
}

testPendingUsers();
