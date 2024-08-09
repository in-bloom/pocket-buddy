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

const useGetTransactions = () => {
  const { userId } = useUserInfo();
  const [transactions, setTransactions] = useState([]);
  const transactionsCollection = collection(db, "transactions");

  const getTransactions = async () => {
    let unsubscribe;
    try {
      const transactionsSnapshot = query(
        transactionsCollection,
        where("userId", "==", userId),
        orderBy("data")
      );
      unsubscribe = onSnapshot(transactionsSnapshot, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.category.startsWith("S")) {
            data.amount = -1 * data.amount;
          } else {
            data.amount = 1 * data.amount;
          }
          docs.push({ ...data, id: doc.id });
        });
        setTransactions(docs);
      });
    } catch (error) {
      console.error(error);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions };
};

export default useGetTransactions;
