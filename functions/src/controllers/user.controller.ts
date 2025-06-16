// src/controllers/user.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { User, getUserById } from '../models/user.model.js'; // Assuming 'User' is your Mongoose model and 'getUserById' is for profile
import { hashPassword } from '../utils/auth.js'; // Assuming you have a utility for hashing passwords

// Define types for request bodies and parameters
type RegisterBody = {
  uid: string; // If you're still using Firebase Auth for UIDs
  email: string;
  password: string; // Add password to the body
};

// Assuming you have a type for the authenticated user, e.g., from authMiddleware
interface AuthenticatedRequest extends FastifyRequest {
  user?: {
    uid: string;
    // Add other user properties if available from your token
  };
}

export const register = async (
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) => {
  const { uid, email, password } = request.body; // Destructure password
  try {
    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    const user = new User({
      uid,
      email,
      password: hashedPassword, // Store the hashed password
      role: 'user', // Always default to 'user' for new registrations
      createdAt: new Date(),
    });

    await user.save();

    reply.code(201).send({ message: 'User created successfully' });
  } catch (err: any) {
    if (err.code === 11000) {
      // Handle duplicate key error (e.g., email or uid already exists)
      return reply.code(409).send({ error: 'User already exists with this email or UID.' });
    }
    reply.code(500).send({ error: err.message });
  }
};

export const promoteToAdmin = async (
  request: FastifyRequest<{ Params: { id: string } }>, // Get 'id' from params
  reply: FastifyReply,
) => {
  const { id } = request.params; // Get the user ID from the URL parameters
  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return reply.code(404).send({ message: 'User not found' });
    }

    // Check if the user is already an admin (optional but good practice)
    if (user.role === 'admin') {
      return reply.code(400).send({ message: 'User is already an admin.' });
    }

    // Update the user's role to 'admin'
    user.role = 'admin';
    await user.save(); // Save the updated user

    reply.send({ success: true, message: 'User promoted to admin successfully' });
  } catch (err: any) {
    reply.code(500).send({ error: err.message });
  }
};

export const profile = async (request: AuthenticatedRequest, reply: FastifyReply) => {
  const user = request.user; // Access the user object from the authenticated request
  if (!user || !user.uid) {
    return reply.code(401).send({ message: 'Unauthorized: User not found in request.' });
  }

  try {
    const data = await getUserById(user.uid); // Use your model function to fetch user data
    if (!data) {
      return reply.code(404).send({ message: 'User profile not found.' });
    }
    reply.send(data);
  } catch (err: any) {
    reply.code(500).send({ error: err.message });
  }
};
