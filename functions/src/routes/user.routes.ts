import { FastifyInstance } from 'fastify';
import {
  register,
  profile,
  promoteToAdmin, // Import the new controller function
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.ts';
import { verifyAdmin } from '../middlewares/admin.middleware.ts'; // Assuming you have an admin verification middleware

export default async function userRoutes(fastify: FastifyInstance) {
  // Public route for user registration
  fastify.post('/register', register);

  // Protected route for user profile
  fastify.get('/profile', {
    preHandler: authMiddleware,
    handler: profile,
  });

  // Route to promote a user to admin (requires authentication and admin privileges)
  fastify.put(
    '/users/:id/promote',
    {
      preHandler: [authMiddleware, verifyAdmin], // Apply auth and admin middleware
      handler: promoteToAdmin, // Use the new controller function
    },
  );
}