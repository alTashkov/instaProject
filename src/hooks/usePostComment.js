import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { fireStore } from "../firebase/firebase";
import usePostStore from "../store/postStore";
import { useState } from "react";
const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addComment = usePostStore(state=>state.addComment)
  const handlePostComment = async (postId, comment) => {

    if(isCommenting)return;
    if(!authUser) return showToast("Error","You must be logged in to comment!","error");
    setIsCommenting(true);
    const newComment = {
        comment:comment,
        createdBy:authUser.uid,
        postId:postId,
        createdAt:Date.now()
    }
    try {
        await updateDoc(doc(fireStore,"posts",postId),{
            comments:arrayUnion(newComment)
        });
        addComment(postId,newComment);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsCommenting(false);
    }
  };
  return { isCommenting, handlePostComment };
};

export default usePostComment;
