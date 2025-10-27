import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { authRoutes } from "./auth";

const app = new Elysia()
  // เพิ่ม CORS support
  .use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"], // frontend URLs
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .use(authRoutes)
  .get("/", () => "Hello from Elysia!")
  .get("/api/hello", () => ({
    message: "สวัสดีจาก Backend Elysia!",
    timestamp: new Date().toISOString(),
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
