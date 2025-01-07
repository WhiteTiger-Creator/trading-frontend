import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TradingProvider } from "./contexts/TradingContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BalanceDashboard from "./components/trading/dashboard/BalanceDashboard";
import TradingApp from "./components/trading/TradingApp";
import FuturesTrading from "./components/trading/futures/FuturesTrading";
import SpotTrading from "./components/trading/spot/SpotTrading";
import HomePage from "./components/layout/HomePage";
import ActivityDashboard from "./components/trading/dashboard/ActivityDashboard";
import { ToastContainer, Bounce } from 'react-toastify';

// Let's update the ProtectedRoute to be more explicit

const App = () => {
  return (
    <Router>
      <AuthProvider>
        {/* Guest Routes */}
        <TradingProvider>
          <div className="container">
            <TradingApp />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="register" element={<Register />} />
              <Route path="future" element={<FuturesTrading />} />
              <Route path="spot" element={<SpotTrading />} />
              <Route path="login" element={<Login />} />
              <Route path="dashboard" element={<BalanceDashboard />} />
              <Route path="activity" element={<ActivityDashboard />} />
            </Routes>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </TradingProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
