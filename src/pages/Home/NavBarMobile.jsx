import { useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faList,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { eraseCookie } from "../../hooks/useSetCookie.js";

const NavBarMobile = () => {
  const user = useUserInfo();
  const navigate = useNavigate();

  const logout = () => {
    eraseCookie("AuthToken");
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="rounded-t-full h-16 bg-indigo-950 fixed bottom-0 left-0 right-0 flex justify-around items-center text-white z-99">
      <button
        className="flex flex-col items-center"
        onClick={() => navigate("/home/dashboard")}
      >
        <FontAwesomeIcon icon={faHome} />
        <span className="text-xs">Home</span>
      </button>
      <button
        className="flex flex-col items-center"
        onClick={() => navigate("/home/transactions")}
      >
        <FontAwesomeIcon icon={faList} />
        <span className="text-xs">Transactions</span>
      </button>
      <button
        className="flex flex-col items-center"
        onClick={() => navigate("/home/settings")}
      >
        <FontAwesomeIcon icon={faCog} />
        <span className="text-xs">Settings</span>
      </button>
      <button className="flex flex-col items-center" onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span className="text-xs">Logout</span>
      </button>
    </div>
  );
};

export default NavBarMobile;
