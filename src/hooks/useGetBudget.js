import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import useUserInfo from "./useUserInfo";

const useGetBudget = () => {
  const { userId } = useUserInfo();
  const [budget, setBudget] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getBudget = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setBudget(userDoc.data().budget || 0);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      getBudget();
    }
  }, [userId]);

  return { budget, loading, error };
};

export default useGetBudget;
