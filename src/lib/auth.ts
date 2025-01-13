import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}

export function generateToken(user: User): string {
  return sign(
    { 
      userId: user.id,
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): { userId: string; email: string; role: string } {
  try {
    return verify(token, JWT_SECRET) as { userId: string; email: string; role: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    return user;
  } catch (error) {
    return null;
  }
}
