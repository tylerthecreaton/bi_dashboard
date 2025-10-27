# BI Dashboard - ระบบ Login

โปรเจคนี้เป็นระบบ BI Dashboard ที่มีระบบ authentication ด้วย Elysia (Backend) และ React (Frontend)

## โครงสร้างโปรเจค

```
bi_dashboard/
├── backend/          # Elysia Backend
│   ├── src/
│   │   ├── index.ts  # Main server file
│   │   └── auth.ts   # Authentication logic
│   └── package.json
└── frontend/         # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── LoginForm.tsx
    │   │   └── ProtectedRoute.tsx
    │   ├── pages/
    │   │   ├── LoginPage.tsx
    │   │   └── DashboardPage.tsx
    │   ├── lib/
    │   │   └── auth.ts
    │   └── App.tsx
    └── package.json
```

## วิธีการติดตั้งและรัน

### 1. ติดตั้ง Dependencies

```bash
# Backend
cd backend
bun install

# Frontend
cd ../frontend
bun install
```

### 2. รัน Backend Server

```bash
cd backend
bun run dev
```

Backend จะรันที่ `http://localhost:3000`

### 3. รัน Frontend Development Server

```bash
cd frontend
bun run dev
```

Frontend จะรันที่ `http://localhost:5173` หรือ `http://localhost:5174` (ขึ้นอยู่กับ port ที่ Vite กำหนด)

## วิธีการทดสอบระบบ Login

1. เปิด browser ไปที่ `http://localhost:5173` หรือ `http://localhost:5174` (ตาม port ที่ frontend รัน)
2. จะพบหน้า login ให้กรอกข้อมูล:
   - ชื่อผู้ใช้: `admin`
   - รหัสผ่าน: `admin123`
3. กดปุ่ม "เข้าสู่ระบบ"
4. หาก login สำเร็จ จะถูก redirect ไปยังหน้า dashboard
5. สามารถทดสอบการออกจากระบบโดยคลิกปุ่ม "ออกจากระบบ"

## API Endpoints

### POST /api/auth/login
สำหรับการเข้าสู่ระบบ

Request Body:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "message": "เข้าสู่ระบบสำเร็จ",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

### GET /api/auth/me
สำหรับดึงข้อมูลผู้ใช้ปัจจุบัน (ต้องมี JWT token)

Headers:
```
Authorization: Bearer <jwt_token>
```

Response:
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

## Features

- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Login Form พร้อม Validation
- ✅ Dashboard หลัง login
- ✅ Logout Functionality
- ✅ CORS Support
- ✅ Toast Notifications
- ✅ Responsive Design

## Technologies

### Backend
- Bun Runtime
- Elysia Framework
- JWT Authentication
- bcryptjs สำหรับ hash password
- TypeScript

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui Components
- React Hook Form + Zod Validation
- React Router DOM
- Axios
- Sonner (Toast Notifications)
- TanStack Query

## หมายเหตุ

- ในระบบจริงควรเก็บข้อมูลผู้ใช้ในฐานข้อมูล
- JWT Secret ควรเก็บใน environment variables
- ควรมีการเพิ่มความปลอดภัยเพิ่มเติม เช่น Rate Limiting, Password Policy เป็นต้น