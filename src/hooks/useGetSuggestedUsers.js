import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);//true on start
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    if (!authUser) return;

    const getSuggestedUsers = async () => {
      try {
        const usersRef = collection(fireStore, "users");
        const q = query(
          usersRef,
          where("uid", "not-in", [authUser.uid, ...authUser.following]),
          orderBy("uid"),
          limit(3)
        );

        const querySnapshot = await getDocs(q);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        setSuggestedUsers(users); 
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);//false after fetch
      }
    };

    getSuggestedUsers();
  }, [authUser, showToast]); // Dependency array ensures effect runs when authUser changes

  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
