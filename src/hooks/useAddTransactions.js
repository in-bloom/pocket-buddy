import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase-config";
import useUserInfo from "./useUserInfo";

export const useAddTransactions = () => {
  const { userId } = useUserInfo();
  const transactionCollRef = collection(db, "transactions");
  const addTransaction = async (amount, description, category, data, type) => {
    await addDoc(transactionCollRef, {
      userId,
      amount: amount,
      description: description,
      category: category,
      type: type,
      data: data,
    });
  };

  return { addTransaction };
};
