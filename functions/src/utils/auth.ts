import bcrypt from 'bcrypt';

/**
 * Hash password using bcrypt
 * @param {string} password - Raw password
 * @returns {Promise<string>} - Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Số vòng băm để tăng độ bảo mật
  return bcrypt.hash(password, saltRounds);
}
