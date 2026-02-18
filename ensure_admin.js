const { db } = require('./config/firebase');

async function ensureAdmin(email) {
    try {
        console.log(`Checking for user: ${email}`);
        const snapshot = await db.collection('users').where('email', '==', email).get();

        if (!snapshot.empty) {
            const batch = db.batch();
            let updated = false;
            snapshot.forEach(doc => {
                batch.update(doc.ref, { role: 'admin', approved: true });
                updated = true;
            });

            if (updated) {
                await batch.commit();
                console.log(`✅ User ${email} was found and promoted to admin.`);
            }
        } else {
            console.log(`⚠️ User ${email} not found in database.`);
            // Cannot create dummy without UID in Firestore auth model properly
        }
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

const email = process.argv[2] || 'ghodeanay@gmail.com';
ensureAdmin(email);
