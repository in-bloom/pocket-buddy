import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import useUserInfo from "./useUserInfo";

const useDefineBudget = () => {
  const { userId } = useUserInfo();

  const defineBudget = async (budget) => {
    try {
      await setDoc(doc(db, "users", userId), { budget }, { merge: true });
    } catch (e) {
      console.error(e);
      console.log(userId, budget);
    }
  };

  return { defineBudget };
};

export default useDefineBudget;
