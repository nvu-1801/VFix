// import { initializeApp, cert } from 'firebase-admin/app';
// import admin from 'firebase-admin';
// import { getAuth } from 'firebase-admin/auth';
// import { getFirestore } from 'firebase-admin/firestore';
// import path from 'path';
// import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import fs from 'fs';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

// if (!serviceAccountPath) {
//   throw new Error("Missing GOOGLE_APPLICATION_CREDENTIALS in .env");
// }

// // ✅ Read file JSON
// const raw = fs.readFileSync(path.resolve(__dirname, serviceAccountPath), 'utf8');
// const serviceAccount = JSON.parse(raw);

// const app = initializeApp({
//   credential: cert(serviceAccount),
// });

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export {admin};