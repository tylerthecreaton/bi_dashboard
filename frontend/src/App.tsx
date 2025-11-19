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
import { SettingsPage } from "@/pages/SettingsPage";
import { HelpPage } from "@/pages/HelpPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { getToken } from "@/lib/auth";
import { NotificationProvider } from "@/contexts/NotificationContext";

function App() {
  return (
    <NotificationProvider>
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
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <HelpPage />
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
    </NotificationProvider>
  );
}

export default App;
