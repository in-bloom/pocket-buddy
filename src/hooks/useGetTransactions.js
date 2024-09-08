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
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const transactionsCollection = collection(db, "transactions");
  const TRANSACTION_LIMIT = 10;

  const getTransactions = async () => {
    setLoading(true);
    let unsubscribe;
    try {
      const transactionsQuery = query(
        transactionsCollection,
        where("userId", "==", userId),
        orderBy("data"),
        limit(TRANSACTION_LIMIT)
      );
      unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.type.startsWith("e")) {
            data.amount = -1 * data.amount;
          } else {
            data.amount = 1 * data.amount;
          }
          docs.push({ ...data, id: doc.id });
        });
        setTransactions(docs);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    return () => unsubscribe();
  };

  const loadMoreTransactions = async () => {
    if (!lastVisible) return;
    setLoading(true);
    try {
      const transactionsQuery = query(
        transactionsCollection,
        where("userId", "==", userId),
        orderBy("data"),
        startAfter(lastVisible),
        limit(TRANSACTION_LIMIT)
      );
      const snapshot = await getDocs(transactionsQuery);
      let docs = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.type.startsWith("e")) {
          data.amount = -1 * data.amount;
        } else {
          data.amount = 1 * data.amount;
        }
        docs.push({ ...data, id: doc.id });
      });
      setTransactions((prev) => [...prev, ...docs]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions, loadMoreTransactions, loading };
};

export default useGetTransactions;
