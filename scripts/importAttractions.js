// scripts/resetAndImportAttractions.js

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// 1) Initialize Admin SDK
const serviceAccount = require('../secrets/private-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

async function resetAndImport() {
  // ——— A) DELETE existing documents in batches ———
  const colRef = db.collection('attractions');
  const allDocs = await colRef.listDocuments();
  console.log(`Deleting ${allDocs.length} existing attractions…`);
  const batchSize = 500;
  for (let i = 0; i < allDocs.length; i += batchSize) {
    const batch = db.batch();
    allDocs.slice(i, i + batchSize).forEach(docRef => batch.delete(docRef));
    await batch.commit();
    console.log(`  • Deleted batch of ${Math.min(batchSize, allDocs.length - i)}`);
  }

  // ——— B) READ new JSON file ———
  const filePath = path.join(__dirname, 'attractions.json');
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  let jsonData;
  try {
    jsonData = JSON.parse(raw);
  } catch (err) {
    console.error('Error parsing JSON:', err);
    process.exit(1);
  }
  if (!jsonData.attractions) {
    console.error("JSON missing 'attractions' field.");
    process.exit(1);
  }

  const entries = Object.entries(jsonData.attractions);
  console.log(`Importing ${entries.length} new attractions…`);

  // ——— C) WRITE each attraction ———
  for (const [id, attraction] of entries) {
    try {
      await colRef.doc(id).set(attraction);
      console.log(`Inserted ${id}: ${attraction.name}`);
    } catch (err) {
      console.error(`Error inserting ${id}:`, err);
    }
  }

  console.log('✅ All attractions have been reset and imported!');
  process.exit(0);
}

resetAndImport().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
