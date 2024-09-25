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
import { subMonths, startOfMonth, endOfMonth, format } from "date-fns";

const getFourMonthsRange = (now, months) => {
  const endDate = endOfMonth(now);
  const startDate = startOfMonth(subMonths(now, months));

  return {
    startDate: format(startDate, "yyyy-MM-dd"),
    endDate: format(endDate, "yyyy-MM-dd"),
  };
};

const useGetMonthlyTransaciton = (now, months) => {
  const { userId } = useUserInfo();
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const transactionsCollection = collection(db, "transactions");
  const { startDate: startOfMonth, endDate: endOfMonth } = getFourMonthsRange(
    now,
    months
  );

  const getExpenses = () => {
    setLoading(true);
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
