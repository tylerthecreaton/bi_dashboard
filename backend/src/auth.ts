import bcrypt from 'bcryptjs';
import { jwt } from '@elysiajs/jwt';
import { Elysia } from 'elysia';

// ข้อมูลผู้ใช้จำลอง (ในระบบจริงควรเก็บในฐานข้อมูล)
interface User {
  id: number;
  username: string;
  email: string;
  password: string; // hashed password
}

// ข้อมูลผู้ใช้ตัวอย่าง (password: admin123)
const users: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: '$2b$10$WgUbF3/t7orIPWG7lukF..Qqco629autgCAKIgxhW6eUhIMir7cGq' // admin123
  }
];

// ฟังก์ชันสำหรับค้นหาผู้ใช้จาก username หรือ email
export const findUser = (usernameOrEmail: string): User | undefined => {
  return users.find(user => 
    user.username === usernameOrEmail || user.email === usernameOrEmail
  );
};

// ฟังก์ชันสำหรับตรวจสอบรหัสผ่าน
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// ฟังก์ชันสำหรับสร้าง authentication routes
export const authRoutes = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production'
    })
  )
  .post('/api/auth/login', async ({ body, jwt, set }) => {
    try {
      const { username, password } = body as { username: string; password: string };
      
      // ค้นหาผู้ใช้
      const user = findUser(username);
      if (!user) {
        set.status = 401;
        return { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
      }
      
      // ตรวจสอบรหัสผ่าน
      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        set.status = 401;
        return { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
      }
      
      // สร้าง JWT token
      const token = await jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email
      });
      
      return {
        success: true,
        message: 'เข้าสู่ระบบสำเร็จ',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      };
    } catch (error) {
      set.status = 500;
      return { success: false, message: 'เกิดข้อผิดพลาดในระบบ' };
    }
  })
  .get('/api/auth/me', async ({ jwt, set, headers }) => {
    try {
      const authorization = headers.authorization;
      if (!authorization) {
        set.status = 401;
        return { success: false, message: 'ไม่พบ authorization header' };
      }
      
      const token = authorization.replace('Bearer ', '');
      const payload = await jwt.verify(token);
      
      if (!payload) {
        set.status = 401;
        return { success: false, message: 'Token ไม่ถูกต้อง' };
      }
      
      const user = findUser(payload.username as string);
      if (!user) {
        set.status = 404;
        return { success: false, message: 'ไม่พบผู้ใช้' };
      }
      
      return {
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      };
    } catch (error) {
      set.status = 500;
      return { success: false, message: 'เกิดข้อผิดพลาดในระบบ' };
    }
  });