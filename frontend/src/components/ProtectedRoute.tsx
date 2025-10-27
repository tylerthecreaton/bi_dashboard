import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser, getToken } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getToken();
        if (!token) {
          setIsUserAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // ตรวจสอบ token กับ backend
        const response = await getCurrentUser(token);
        if (response.success) {
          setIsUserAuthenticated(true);
        } else {
          setIsUserAuthenticated(false);
        }
      } catch {
        setIsUserAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}