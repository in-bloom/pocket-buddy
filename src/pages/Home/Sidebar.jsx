import { useNavigate } from "react-router-dom";
import { eraseCookie } from "../../hooks/useSetCookie.js";
import {
  faHome,
  faList,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    eraseCookie("authToken");
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="bg-indigo-900 text-white flex flex-col items-center z-50 p-5 my-4 ml-4 rounded-t-full rounded-b-full">
      <div className="flex flex-col items-center w-full">
        <button
          className="w-full h-14 bg-indigo-900 text-2xl rounded-t-lg transform transition-transform duration-200 hover:scale-110"
          onClick={() => navigate("dashboard")}
        >
          <FontAwesomeIcon icon={faHome} />
        </button>
        <button
          className="w-full h-14 bg-indigo-900 transform transition-transform duration-200 hover:scale-110 text-2xl mt-6"
          onClick={() => navigate("transactions")}
        >
          <FontAwesomeIcon icon={faList} />
        </button>
        <button
          className="w-full h-14 bg-indigo-900 transform transition-transform duration-200 hover:scale-110 text-2xl mt-6 rounded-b-lg"
          onClick={() => navigate("settings")}
        >
          <FontAwesomeIcon icon={faCog} />
        </button>
      </div>
      <button
        className="w-full h-14 bg-indigo-900 transform transition-transform duration-200 hover:scale-110 text-2xl mt-auto"
        onClick={logout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} />
      </button>
    </div>
  );
};

export default Sidebar;
