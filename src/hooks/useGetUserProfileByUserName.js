import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import useProfileStore from "../store/userProfileStore";

const useGetUserProfileByUserName = (user) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useProfileStore();

  useEffect(() => {
    if (userProfile && userProfile.username === user) {
      setIsLoading(false); // Data already exists
      return;
    }
  
    setIsLoading(true); // Trigger loading indicator
  
    const getUserProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
  
      try {
        const q = query(
          collection(fireStore, "users"),
          where("username", "==", user)
        );
        const querySnap = await getDocs(q);
  
        if (querySnap.empty) {
          setUserProfile(null); // Explicitly set null if no user is found
          return;
        }
  
        const userDoc = querySnap.docs[0]?.data();
        setUserProfile(userDoc);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
  
    getUserProfile();
  }, [user, userProfile, setUserProfile, showToast]);
  return { isLoading, userProfile };
};

export default useGetUserProfileByUserName;