import { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore } from "../firebase/firebase";

const useGetUserPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const showToast = useShowToast();
  const userProfile = useUserProfileStore((state) => state.userProfile);

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile || !userProfile.uid) return; // Check if `userProfile` is valid
      try {
        const q = query(
          collection(fireStore, "posts"), // Fix query placement
          where("createdBy", "==", userProfile.uid)
        );
        const querySnap = await getDocs(q);
        const fetchedPosts = [];

        querySnap.forEach((doc) => {
          fetchedPosts.push({ ...doc.data(), id: doc.id }); // Fix data retrieval
        });

        // Sort by creation time in descending order
        fetchedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(fetchedPosts);
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]); // Reset posts on error
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [userProfile?.uid, setPosts, showToast]); // Avoid passing the entire object

  return { isLoading, posts };
};

export default useGetUserPosts;
