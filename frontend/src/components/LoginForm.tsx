import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { login, saveToken } from "@/lib/auth";

// สร้าง schema สำหรับ validation
const loginSchema = z.object({
  username: z.string().min(1, "กรุณากรอกชื่อผู้ใช้"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await login(data.username, data.password);

      if (response.success) {
        saveToken(response.token);
        toast.success("เข้าสู่ระบบสำเร็จ");
        onSuccess();
      } else {
        toast.error(response.message || "เข้าสู่ระบบล้มเหลว");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-black">$</span>
          <span className="text-black">read -p "username: " username</span>
        </div>
        <div className="ml-4 mb-6">
          <div className="border border-gray-300 rounded px-2 py-1 bg-white">
            <input
              type="text"
              placeholder="admin"
              {...register("username")}
              disabled={isLoading}
              className="bg-transparent border-none outline-none text-black font-mono text-sm w-full placeholder-gray-500"
            />
          </div>
          {errors.username && (
            <p className="text-red-600 text-xs mt-1">Error: {errors.username.message}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-black">$</span>
          <span className="text-black">read -s -p "password: " password</span>
        </div>
        <div className="ml-4 mb-6">
          <div className="border border-gray-300 rounded px-2 py-1 bg-white">
            <input
              type="password"
              placeholder="•••••••"
              {...register("password")}
              disabled={isLoading}
              className="bg-transparent border-none outline-none text-black font-mono text-sm w-full placeholder-gray-500"
            />
          </div>
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">Error: {errors.password.message}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-black">$</span>
          <button
            type="submit"
            disabled={isLoading}
            className="border border-gray-300 rounded px-3 py-1 bg-white text-black font-mono text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "./authenticate --processing..." : "./authenticate --submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
