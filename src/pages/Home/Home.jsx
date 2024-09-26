import { useNavigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import useUserInfo from "../../hooks/useUserInfo";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "react-responsive";
import NavBarMobile from "./NavBarMobile";

const Dashboard = lazy(() => import("./Dashboard"));
const Transactions = lazy(() => import("./Transactions"));
const Settings = lazy(() => import("./Settings"));

export const Home = () => {
  const userInfo = useUserInfo();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (!userInfo || !userInfo.isAuth) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  if (!userInfo || !userInfo.isAuth) {
    return null;
  } else {
    return (
      <div className="relative h-screen w-screen bg-slate-950 flex flex-col justify-center overflow-auto">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] 2xl:h-[700px] 2xl:w-[700px]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] 2xl:h-[700px] 2xl:w-[700px]"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10"></div>

        <div className="flex h-screen flex-col ">
          <div className="flex-grow flex">
            {isMobile ? null : <Sidebar />}
            <div className="flex-grow flex flex-col justify-center">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Suspense>
            </div>
          </div>
          {isMobile && <NavBarMobile />}
        </div>
      </div>
    );
  }
};
