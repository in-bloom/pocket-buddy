import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import useUserInfo from "./useUserInfo";

export const useAddTransactions = () => {
  const { userId } = useUserInfo();
  const transactionCollRef = collection(db, "transactions");
  const addTransaction = async (amount, description, category, data) => {
    await addDoc(transactionCollRef, {
      userId,
      amount: amount,
      description: description,
      category: category,
      data: data,
    });
  };

  return { addTransaction };
};
