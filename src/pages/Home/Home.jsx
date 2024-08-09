import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Transactions from "./Transactions";

export const Home = () => {
  const userInfo = useUserInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.isAuth) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.isAuth) {
    return null;
  } else {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 h-screen">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    );
  }
};
