import { LoginForm } from "@/components/LoginForm";
import { useNavigate } from "react-router-dom";
import PixelBlast from "@/components/PixelBlast";

export function LoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gary-100">
      {/* PixelBlast Background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="triangle"
          pixelSize={4}
          color="#4A7C59"
          patternScale={2}
          patternDensity={0.8}
          enableRipples={true}
          rippleSpeed={0.3}
          rippleThickness={0.15}
          edgeFade={0.3}
          speed={0.8}
          transparent={true}
        />
      </div>
      
      {/* Login Form Container */}
      <div className="max-w-2xl w-full relative z-10">
        {/* Mac Terminal Window */}
        <div className="bg-gray-200 rounded-t-lg flex items-center px-4 py-2 space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 text-center text-sm text-gray-700 font-mono">
            login@bi-dashboard:~
          </div>
        </div>

        {/* Terminal Content */}
        <div className="bg-white text-black font-mono p-6 rounded-b-lg shadow-2xl">
          <div className="mb-6">
            <p className="text-sm mb-2">$ ./bi-dashboard --login</p>
            <p className="text-xs text-gray-600 mb-4">
              BI Dashboard Authentication System v1.0.0
            </p>
            <p className="text-xs text-gray-600 mb-6">
              Copyright (c) 2024 BI Dashboard. All rights reserved.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-black">$</span>
              <span className="text-black">echo "Enter your credentials:"</span>
            </div>
            <p className="text-gray-700 text-sm ml-4">
              Enter your credentials:
            </p>

            <LoginForm onSuccess={handleLoginSuccess} />

            <div className="mt-6 text-xs text-gray-600">
              <p className="mb-1">Available commands:</p>
              <p className="ml-4">• username: admin</p>
              <p className="ml-4">• password: admin123</p>
              <p className="ml-4">• help: show this message</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
