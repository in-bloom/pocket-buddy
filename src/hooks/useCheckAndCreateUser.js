import { db } from "../config/firebase-config";
import { setDoc, getDoc, doc } from "firebase/firestore";

const useCheckAndCreateUser = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      userName: user.displayName,
      profilePic: user.photoURL,
    });
  }

  var data = (await getDoc(userRef)).data();

  return { ...data, userId: user.uid };
};

export default useCheckAndCreateUser;
