import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// ------------------- Load .env -------------------
dotenv.config();
console.log("✅ File index.ts bắt đầu chạy");
// ------------------- Init -------------------
const fastify = Fastify({ logger: true });

// ------------------- Middleware -------------------
await fastify.register(cors, {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

// ------------------- MongoDB Connection -------------------
const { MONGO_URI, MONGO_USER, MONGO_PASS, MONGO_CULSTER, MONGO_DB, PORT } =
  process.env;

const mongoConnectionString =
  MONGO_URI ||
  `mongodb+srv://${MONGO_USER}:${encodeURIComponent(
    MONGO_PASS || ""
  )}@${MONGO_CULSTER}/${MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;

await mongoose
  .connect(mongoConnectionString)
  .then(() => {
    console.log("✅ MongoDB connected");
    console.log(`🧩 Connected to DB: ${MONGO_DB}`);
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ------------------- Routes -------------------
fastify.get("/", async (request, reply) => {
  return { message: "✅ Fastify server is up and running!" };
});


// ✅ Register modular route handlers
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";

await fastify.register(userRoutes, { prefix: '/api/users' });
await fastify.register(productRoutes, { prefix: '/api/products' });

// ------------------- Start Server -------------------
const port = Number(PORT) || 4000;

fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
});
