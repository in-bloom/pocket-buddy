import { useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo.js";

const Sidebar = () => {
  const user = useUserInfo();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="h-screen w-72 bg-gray-800 text-white flex flex-col items-center z-50">
      <div className="flex flex-col items-center mt-8 p-4">
        <img
          src={user.profilePic}
          alt="Immagine profilo"
          className="w-36 h-36 rounded-full"
        />
        <h1 className="text-2xl font-bold mt-5">{user.userName}</h1>
      </div>
      <div className="w-full mt-12 flex flex-col">
        <button
          className="w-full h-14 bg-gray-800 hover:bg-gray-600 text-2xl text-left pl-10"
          onClick={() => navigate("dashboard")}
        >
          Bilancio
        </button>
        <button
          className="w-full h-14 bg-gray-800 hover:bg-gray-600 text-2xl text-left pl-10 mt-6"
          onClick={() => navigate("transactions")}
        >
          Gestisci Transazioni
        </button>
        <button
          className="w-full h-14 bg-gray-800 hover:bg-gray-600 text-2xl text-left pl-10 mt-6"
          onClick={() => navigate("settings")}
        >
          Impostazioni
        </button>
      </div>
      <button
        className="w-full h-14 bg-gray-800 hover:bg-gray-600 text-2xl text-left pl-10 mt-auto"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
