const { db } = require('./config/firebase');

async function run() {
    try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', 'ghodeanay@gmail.com').get();

        if (snapshot.empty) {
            console.log("User not found via exact match.");
        } else {
            console.log("USER_DATA_START");
            snapshot.forEach(doc => {
                console.log(JSON.stringify({ ...doc.data(), id: doc.id }, null, 2));
            });
            console.log("USER_DATA_END");
        }
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}
run();
