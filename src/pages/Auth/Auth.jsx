import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import useCheckAndCreateUser from "../../hooks/useCheckAndCreateUser";
import { useState, useEffect } from "react";

export const Auth = () => {
  let navigate = useNavigate();

  const [isRegistered, setIsRegistered] = useState(true);

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const u_data = await useCheckAndCreateUser(user);

      u_data["isAuth"] = true;
      localStorage.setItem("auth", JSON.stringify(u_data));
      navigate("/home/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 flex h-3/4">
        <div className="w-1/2 p-4 flex flex-col justify-center">
          <div className="flex items-center text-center space-x-4 mb-9">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full"></div>
            </div>
            <h1 className="text-3xl font-bold">Pocket Buddy</h1>
          </div>
          <p className="text-lg mb-6">
            Benvenuto su Pocket Buddy, gestisci le tue spese in modo semplice.
            Tieni traccia delle spese e guadagni fissi e di quelli occasionali e
            ottieni il tuo bilancio in qualsiasi momento!
          </p>
        </div>
        <div className="w-1/2 p-4 flex flex-col justify-center items-center ">
          {isRegistered ? (
            <>
              <h1 className="text-3xl mb-5 font-semibold">
                Accedi con la mail
              </h1>
              <form className="w-full flex flex-col justify-center items-center">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-11/12 py-2 px-3 border border-gray-500 rounded-lg mt-2 text-gray-800 text-center mb-3"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-11/12 py-2 px-3 border border-gray-500 rounded-lg mt-2 text-gray-800 text-center mb-1"
                />
                <p className="mt-1">
                  Non hai un account?{" "}
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegistered(false);
                    }}
                    className="text-blue-500"
                  >
                    Registrati
                  </a>
                </p>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl mb-5 font-semibold">
                Registrati con la mail
              </h1>
              <form className="w-full flex flex-col justify-center items-center">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-11/12 py-2 px-3 border border-gray-500 rounded-lg mt-2 text-gray-800 text-center mb-3"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-11/12 py-2 px-3 border border-gray-500 rounded-lg mt-2 text-gray-800 text-center mb-3"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-11/12 py-2 px-3 border border-gray-500 rounded-lg mt-2 text-gray-800 text-center mb-3"
                />
                <input
                  type="password"
                  placeholder="Conferma Password"
                  className="w-11/12 py-2 px-3 border border-gray-500 rounded-lg mt-2 text-gray-800 text-center mb-1"
                />
                <p className="mt-1">
                  Hai già un account?{" "}
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegistered(true);
                    }}
                    className="text-blue-500"
                  >
                    Accedi
                  </a>
                </p>
              </form>
            </>
          )}

          <h1 className="text-l mb-5">Oppure</h1>
          <button
            className="w-11/12 py-2 px-3 bg-gray-800 text-white rounded-lg hover:bg-slate-700 transition duration-300"
            onClick={signInGoogle}
          >
            Accedi con Google
          </button>
        </div>
      </div>
    </div>
  );
};
