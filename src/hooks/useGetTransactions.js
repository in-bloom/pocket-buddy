import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
  limit,
  startAfter,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import useUserInfo from "./useUserInfo";

const useGetTransactions = () => {
  const { userId } = useUserInfo();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const transactionsCollection = collection(db, "transactions");

  const getTransactions = async () => {
    setLoading(true);
    let unsubscribe;
    try {
      const transactionsQuery = query(
        transactionsCollection,
        where("userId", "==", userId),
        orderBy("data")
      );
      unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          data.amount = -1 * data.amount;
          docs.push({ ...data, id: doc.id });
        });
        setTransactions(docs);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, loading };
};

export default useGetTransactions;
