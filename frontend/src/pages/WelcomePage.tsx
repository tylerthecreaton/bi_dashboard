import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Button } from "@/components/ui/button";
import PixelBlast from "@/components/PixelBlast";

export function WelcomePage() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // แสดงเนื้อหาหลังจาก animation เริ่ม
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-slate-100">
      {/* PixelBlast Background */}
      <div className="absolute inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={4}
          color="#10B981"
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
      
      {/* Welcome Content Container */}
      <div className="max-w-2xl w-full relative z-10">
        {/* Mac Terminal Window */}
        <div className="bg-gray-200 rounded-t-lg flex items-center px-4 py-2 space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 text-center text-sm text-gray-700 font-mono">
            welcome@bi-dashboard:~
          </div>
        </div>

        {/* Terminal Content */}
        <div className="bg-white text-black font-mono p-6 rounded-b-lg shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-black">$</span>
              <span className="text-black">./welcome --user=admin</span>
            </div>

            <div className="ml-4">
              <TypingAnimation
                words={["Welcome admin to BI Dashboard"]}
                duration={50}
                pauseDelay={1500}
                className="text-green-600 text-lg"
              />
            </div>

            {showContent && (
              <>
                <div className="ml-4 mt-6 space-y-2">
                  <p className="text-gray-700">Initializing dashboard...</p>
                  <p className="text-gray-700">Loading modules:</p>
                  <div className="ml-4 space-y-1">
                    <p className="text-green-600">✓ Authentication system</p>
                    <p className="text-green-600">✓ Data analytics engine</p>
                    <p className="text-green-600">✓ Real-time monitoring</p>
                    <p className="text-green-600">✓ Report generator</p>
                  </div>
                  <p className="text-gray-700 mt-4">System ready!</p>
                </div>

                <div className="ml-4 mt-8">
                  <div className="border border-gray-300 rounded px-3 py-1 bg-white inline-block">
                    <Button
                      onClick={handleGoToDashboard}
                      className="text-black font-mono text-sm hover:bg-gray-50"
                      variant="ghost"
                    >
                      ./dashboard --launch
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
