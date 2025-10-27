import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { WelcomePage } from "@/pages/WelcomePage";
import { PublicPresentationPage } from "@/pages/PublicPresentationPage";
import { InternalUsePage } from "@/pages/InternalUsePage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getToken } from "@/lib/auth";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              getToken() ? <Navigate to="/welcome" replace /> : <LoginPage />
            }
          />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <WelcomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/public-presentation"
            element={
              <ProtectedRoute>
                <PublicPresentationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internal-use"
            element={
              <ProtectedRoute>
                <InternalUsePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              getToken() ? (
                <Navigate to="/welcome" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
