import axios from 'axios';

// สร้าง axios instance สำหรับเชื่อมต่อกับ backend
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ฟังก์ชันสำหรับ login
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/api/auth/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' };
    }
    throw { message: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ' };
  }
};

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้ปัจจุบัน
export const getCurrentUser = async (token: string) => {
  try {
    const response = await api.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || { message: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' };
    }
    throw { message: 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ' };
  }
};

// ฟังก์ชันสำหรับบันทึก token ลง localStorage
export const saveToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// ฟังก์ชันสำหรับดึง token จาก localStorage
export const getToken = () => {
  return localStorage.getItem('auth_token');
};

// ฟังก์ชันสำหรับลบ token จาก localStorage
export const removeToken = () => {
  localStorage.removeItem('auth_token');
};

// ฟังก์ชันสำหรับตรวจสอบว่ามี token หรือไม่
export const isAuthenticated = () => {
  return !!getToken();
};