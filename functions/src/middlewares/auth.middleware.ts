// src/middlewares/auth.middleware.ts
import { FastifyRequest, FastifyReply } from 'fastify';
// Import your JWT or Firebase Auth verification logic
// import jwt from 'jsonwebtoken'; // Example for JWT

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    // Example: Verify a Bearer token
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({ message: 'No authorization token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Replace with your actual token verification logic
    // For Firebase ID tokens:
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // For custom JWTs:
    // const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    // IMPORTANT: Attach the decoded user information to the request object
    // This `user` object will then be available in your controllers
    (request as any).user = {
      uid: 'some_decoded_user_id', // Replace with actual decoded UID
      // ... other user info from the token like email, role etc.
    };

    // If using a custom JWT and you store roles in it:
    // (request as any).user.role = (decodedToken as any).role;


    // Proceed to the next handler
    return;
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      return reply.code(401).send({ message: 'Token expired' });
    }
    reply.code(401).send({ message: 'Invalid token' });
  }
};