import { useState } from "react";
import useShowToast from "./useShowToast";
import { fireStore } from "../firebase/firebase";
import { query, where } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);
    try {
        const q = query(collection(fireStore,"users"),where("username","==",username))
        const querySnapshot = await getDocs(q);
        if(querySnapshot.empty)return showToast("Error","User not found","error");
        querySnapshot.forEach((doc) => {
            setUser(doc.data());
        });

    } catch (error) {
      showToast("Error","Error fetching user profile","error");
    } finally {
      setIsLoading(false);
    }
  };
  return {isLoading,getUserProfile,user, setUser}
};

export default useSearchUser;
