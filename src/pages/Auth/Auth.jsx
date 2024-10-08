import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import useCheckAndCreateUser from "../../hooks/useCheckAndCreateUser";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithCustomToken,
} from "firebase/auth";
import { setCookie, getCookie } from "../../hooks/useSetCookie";
import { useEffect } from "react";

export const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("AuthToken");
    if (token) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate("/home/dashboard");
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [auth, navigate]);

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      const u_data = await useCheckAndCreateUser(user);

      u_data["isAuth"] = true;
      localStorage.setItem("auth", JSON.stringify(u_data));
      const token = await user.getIdToken();
      setCookie("AuthToken", token, 7);
      navigate("/home/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative h-screen w-screen bg-slate-950 overflow-hidden">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] 2xl:h-[700px] 2xl:w-[700px]"></div>
      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] 2xl:h-[700px] 2xl:w-[700px]"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10">
        <div className="text-white text-center">
          <h1 className="p-5 text-4xl md:p-5 md:text-5xl 2xl:text-6xl">
            Benvenuto su
            <br /> {""}
            <strong>
              Pocket Buddy <span>&reg;</span>
            </strong>
          </h1>
          <p className="mb-6 text-lg p-6 md:text-2xl md:p-12 2xl:text-4xl 2xl:pl-48 2xl:pr-48">
            Gestisci le tue spese in modo semplice. Tieni traccia delle spese e
            guadagni fissi e di quelli occasionali e ottieni il tuo bilancio in
            qualsiasi momento!
          </p>
          <button
            className="w-1/2 max-w-xs py-2 px-3 bg-indigo-950 text-white rounded-lg hover:bg-slate-700 transition duration-300 md:w-full 2xl:w-96 2xl:h-16 2xl:text-2xl"
            onClick={signInGoogle}
          >
            Accedi con <u>Google</u>
          </button>
        </div>
      </div>
    </div>
  );
};
