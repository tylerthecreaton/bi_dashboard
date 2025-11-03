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
import { InternalUsePage } from "@/pages/InternalUsePage";
import { LandingPage } from "@/pages/LandingPage";
import { DashboardViewPage } from "@/pages/DashboardViewPage";
import { AnalyticsViewPage } from "@/pages/AnalyticsViewPage";
import { ReportsViewPage } from "@/pages/ReportsViewPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getToken } from "@/lib/auth";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard-view" element={<DashboardViewPage />} />
          <Route path="/analytics-view" element={<AnalyticsViewPage />} />
          <Route path="/reports-view" element={<ReportsViewPage />} />
          <Route path="/login" element={<LoginPage />} />
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
