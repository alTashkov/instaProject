import { useEffect } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import { useState } from "react";

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null); // Set initial state to null
  const showToast = useShowToast();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        if (!userId) return;
        const userRef = await getDoc(doc(fireStore, "users", userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch (error) {
        showToast("Error", error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      getUserProfile();
    }
  }, [showToast, userId]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
