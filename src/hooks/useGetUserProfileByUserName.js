import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";
import useProfileStore from "../store/userProfileStore";

const useGetUserProfileByUserName = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const showToast = useShowToast();
  const { userProfile, setUserProfile } = useProfileStore();

  useEffect(() => {
    // Fetch user profile only if username is provided
    if (!username) {
      setUserProfile(null); // Reset profile
      setIsLoading(false);
      return;
    }

    // Prevent duplicate fetch if already loaded
    if (userProfile?.username === username) {
      setIsLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      setIsLoading(true); // Start loading state

      try {
        const q = query(
          collection(fireStore, "users"),
          where("username", "==", username)
        );
        const querySnap = await getDocs(q);

        if (querySnap.empty) {
          setUserProfile(null); // User not found
        } else {
          const userDoc = querySnap.docs[0].data();
          setUserProfile(userDoc); // Update profile
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    fetchUserProfile();
  }, [username]); // Only re-run when username changes

  return { isLoading, userProfile };
};

export default useGetUserProfileByUserName;
