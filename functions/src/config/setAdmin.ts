// import { initializeApp, cert } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// import * as dotenv from "dotenv";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // 🟡 Lấy UID từ .env
// const uid = process.env.ADMIN_FIREBASE_UID;
// if (!uid) {
//   throw new Error("❌ ADMIN_FIREBASE_UID chưa được định nghĩa trong .env");
// }

// // 🟢 Đọc file serviceAccountKey
// const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
// if (!keyPath) {
//   throw new Error("❌ GOOGLE_APPLICATION_CREDENTIALS chưa được định nghĩa trong .env");
// }

// const serviceAccount = JSON.parse(
//   fs.readFileSync(path.resolve(__dirname, keyPath), "utf8")
// );

// // 🟢 Khởi tạo Firebase
// initializeApp({
//   credential: cert(serviceAccount),
// });

// // 🟢 Set quyền admin
// getAuth().setCustomUserClaims(uid, { admin: true })
//   .then(() => {
//     console.log(`✅ Đã cấp quyền admin cho UID: ${uid}`);
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error("❌ Lỗi khi cấp quyền admin:", err);
//     process.exit(1);
//   });
