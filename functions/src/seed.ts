import axios from 'axios';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

const API_URL = 'http://localhost:4000/api'; // ⚠️ Đảm bảo backend đang chạy!

// ⚠️ Thêm trước `seed()` để dọn dữ liệu cũ
await axios.delete(`${API_URL}/products/clear-all`).catch(console.error);

/** Generate random image URL from Lorem Picsum */
const categoryImages: Record<string, string[]> = {
  Food: [
    'https://source.unsplash.com/300x300/?food',
    'https://source.unsplash.com/300x300/?meal',
    'https://source.unsplash.com/300x300/?lunch',
  ],
  Drink: [
    'https://source.unsplash.com/300x300/?drink',
    'https://source.unsplash.com/300x300/?beverage',
    'https://source.unsplash.com/300x300/?coffee',
  ],
  Dessert: [
    'https://source.unsplash.com/300x300/?dessert',
    'https://source.unsplash.com/300x300/?cake',
    'https://source.unsplash.com/300x300/?icecream',
  ],
  'Main Course': [
    'https://source.unsplash.com/300x300/?steak',
    'https://source.unsplash.com/300x300/?maincourse',
  ],
  Snack: [
    'https://source.unsplash.com/300x300/?snack',
    'https://source.unsplash.com/300x300/?chips',
  ],
  'Milk Tea': [
    'https://source.unsplash.com/300x300/?milktea',
    'https://source.unsplash.com/300x300/?boba',
    'https://source.unsplash.com/300x300/?bubbletea',
  ],
  'Matcha Latte': [
    'https://source.unsplash.com/300x300/?matcha',
    'https://source.unsplash.com/300x300/?latte',
    'https://source.unsplash.com/300x300/?matchalatte',
  ],
};

const getImageForCategory = (category: string) => {
  const images = categoryImages[category];
  if (!images) return `https://source.unsplash.com/300x300/?${category}`;
  return faker.helpers.arrayElement(images);
};

/** Create random product object */
const generateProduct = () => {
  const category = faker.helpers.arrayElement([
    'Food',
    'Drink',
    'Dessert',
    'Main Course',
    'Snack',
    'Milk Tea',
    'Matcha Latte',
  ]);

  return {
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price({ min: 50000, max: 250000 })),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 1, max: 100 }),
    category,
    image: getImageForCategory(category),
    rating: faker.number.int({ min: 4, max: 5 })
  };
};

/** Create random user object */
const generateUser = () => ({
  uid: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  role: faker.helpers.arrayElement(['user', 'admin']),
});

/** Create random order object */
const generateOrder = (userId: string, productIds: string[]) => ({
  userId,
  items: productIds.slice(0, faker.number.int({ min: 1, max: 3 })).map(pid => ({
    productId: pid,
    quantity: faker.number.int({ min: 1, max: 5 }),
  })),
  totalPrice: faker.number.int({ min: 100000, max: 1000000 }),
  status: faker.helpers.arrayElement(['pending', 'paid', 'shipped']),
  createdAt: new Date(),
});

const seed = async () => {
  try {
    console.log('🚀 Seeding products via API...');

    // Step 1: Tạo 10 sản phẩm
    const createdProductIds: string[] = [];

    for (let i = 0; i < 10; i++) {
      const product = generateProduct();
      const res = await axios.post(`${API_URL}/products`, product);
      console.log(`✅ Created: ${res.data.name}`);
      createdProductIds.push(res.data.id);
    }

    // Step 2: Tạo 3 users (gửi lên Firebase nếu muốn)
    const users = Array.from({ length: 3 }, generateUser);
    for (const user of users) {
      await axios.post(`${API_URL}/users`, user).catch(() => {});
      console.log(`👤 User created: ${user.name}`);
    }

    // Step 3: Tạo 2 đơn hàng cho mỗi user
    for (const user of users) {
      for (let i = 0; i < 2; i++) {
        const order = generateOrder(user.uid, createdProductIds);
        await axios.post(`${API_URL}/orders`, order).catch(() => {});
        console.log(`📦 Order created for ${user.name}`);
      }
    }

    console.log('🎉 Done seeding!');
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Seed error:', err.message || err);
    process.exit(1);
  }
};
console.log(`🌱 Seeding into DB: ${process.env.MONGO_DB}`);

seed();


// // scripts/seed.js
// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// import { User } from '../src/models/user.model.js'; // Điều chỉnh đường dẫn đến User model của bạn
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myshop';
// const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'defaultadminpassword'; // Đặt mật khẩu mặc định an toàn hơn hoặc luôn yêu cầu từ env
// const ADMIN_UID = process.env.ADMIN_UID || 'initial_admin_uid'; // UID cho admin

// async function seedAdminUser() {
//   console.log('Starting admin user seeding...');

//   try {
//     // 1. Connect to MongoDB
//     await mongoose.connect(MONGO_URI);
//     console.log('Connected to MongoDB.');

//     // 2. Hash the admin password
//     const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10); // 10 là saltRounds, càng cao càng an toàn nhưng chậm hơn

//     // 3. Check if admin user already exists
//     let adminUser = await User.findOne({ email: ADMIN_EMAIL });

//     if (adminUser) {
//       // 4. Update existing admin user (optional: update password if needed)
//       console.log(`Admin user with email ${ADMIN_EMAIL} already exists.`);
//       if (adminUser.role !== 'admin') {
//         adminUser.role = 'admin';
//         await adminUser.save();
//         console.log(`Updated existing user ${ADMIN_EMAIL} to admin role.`);
//       }
//       // You might want to uncomment the following lines to update password on every seed run,
//       // but be careful if you don't want to reset it every time.
//       // if (adminUser.password !== hashedPassword) {
//       //     adminUser.password = hashedPassword;
//       //     await adminUser.save();
//       //     console.log(`Updated password for admin user ${ADMIN_EMAIL}.`);
//       // }
//     } else {
//       // 5. Create new admin user
//       console.log(`Creating new admin user: ${ADMIN_EMAIL}`);
//       adminUser = new User({
//         uid: ADMIN_UID,
//         email: ADMIN_EMAIL,
//         password: hashedPassword,
//         role: 'admin',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });
//       await adminUser.save();
//       console.log('Admin user created successfully!');
//     }
//   } catch (error) {
//     console.error('Error during seeding:', error);
//   } finally {
//     // 6. Disconnect from MongoDB
//     await mongoose.disconnect();
//     console.log('Disconnected from MongoDB.');
//     process.exit(0); // Exit the script gracefully
//   }
// }

// // Execute the seeding function
// seedAdminUser();
