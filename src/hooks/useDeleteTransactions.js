import useUserInfo from "./useUserInfo";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

const useDeleteTransactions = () => {
  const { userId } = useUserInfo();

  const deleteTransaction = async (document_id) => {
    try {
      const docRef = doc(db, "transactions", document_id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data().userId === userId) {
          await deleteDoc(docRef);
        } else {
          console.error("You are not allowed to delete this transaction!");
        }
      } else {
        console.error("No such document!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { deleteTransaction };
};

export default useDeleteTransactions;
