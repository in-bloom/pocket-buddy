import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  let navigate = useNavigate();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    const authinfo = {
      userId: result.user.uid,
      userName: result.user.displayName,
      profilePic: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authinfo));
    navigate("/home/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-10/12 max-w-4xl flex h-3/4">
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
        <div className="w-1/2 p-4 flex flex-col justify-center items-center">
          <h1 className="text-3xl mb-20">Fai Sign In con Google</h1>
          <button
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-slate-700 transition duration-300"
            onClick={signIn}
          >
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};
