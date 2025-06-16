// src/middlewares/admin.middleware.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../models/user.model.js'; // Import your User model

// Assuming your authMiddleware attaches a 'user' object to the request with at least 'uid'
interface AuthenticatedRequestWithUser extends FastifyRequest {
  user?: {
    uid: string;
    // Add other user properties like role if your auth token contains it
  };
}

export const verifyAdmin = async (
  request: AuthenticatedRequestWithUser,
  reply: FastifyReply,
) => {
  if (!request.user || !request.user.uid) {
    return reply.code(401).send({ message: 'Unauthorized: User not authenticated.' });
  }

  try {
    // Fetch the user from the database to get their current role
    const user = await User.findOne({ uid: request.user.uid });

    if (!user) {
      return reply.code(404).send({ message: 'User not found.' });
    }

    if (user.role !== 'admin') {
      return reply.code(403).send({ message: 'Forbidden: Admin access required.' });
    }

    // If the user is an admin, proceed to the next handler
    return;
  } catch (err: any) {
    reply.code(500).send({ error: err.message || 'Internal server error during admin check' });
  }
};