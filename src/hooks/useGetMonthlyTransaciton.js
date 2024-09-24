import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import useUserInfo from "./useUserInfo";

const useGetMonthlyTransaciton = () => {
  const { userId } = useUserInfo();
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const transactionsCollection = collection(db, "transactions");

  const getExpenses = () => {
    setLoading(true);
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const startOfMonth = `${year}-${String(month).padStart(2, "0")}-01`;
    const endOfMonth = `${year}-${String(month).padStart(2, "0")}-${new Date(year, month, 0).getDate()}`;

    try {
      let transactionsQuery;
      transactionsQuery = query(
        transactionsCollection,
        where("userId", "==", userId),
        where("data", ">=", startOfMonth),
        where("data", "<=", endOfMonth),
        orderBy("data")
      );

      const unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          docs.push({ ...data, id: doc.id });
        });
        setMonthlyExpenses(docs);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = getExpenses();

    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [userId]);

  return { monthlyExpenses, loading };
};

export default useGetMonthlyTransaciton;
