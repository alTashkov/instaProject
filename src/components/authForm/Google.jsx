import { Flex, Image, Span } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { fireStore } from "../../firebase/firebase";

const Google = ({ isLogin}) => {
  const [signInWithGoogle,user,loading,error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const loginUser = useAuthStore((state)=>state.login)
  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
			if (!newUser && error) {
				showToast("Error", error.message, "error");
				return;
			}
			const userRef = doc(fireStore, "users", newUser.user.uid);
			const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
				// login
				const userDoc = userSnap.data();
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			} else {
				// signup
				const userDoc = {
					uid: newUser.user.uid,
					email: newUser.user.email,
					username: newUser.user.email.split("@")[0],
					fullName: newUser.user.displayName,
					bio: "",
					profilePicURL: newUser.user.photoURL,
					followers: [],
					following: [],
					posts: [],
					createdAt: Date.now(),
				};
				await setDoc(doc(fireStore, "users", newUser.user.uid), userDoc);
				localStorage.setItem("user-info", JSON.stringify(userDoc));
				loginUser(userDoc);
			}
    }
    catch {
      showToast("Error",error.message,"error")
    }
  }
  return (
    <Flex
      justifyContent={"center"}
      marginBottom={isLogin ? "4" : "0"}
      width={190}
      color={"blue.600"}
      alignItems={"center"}
      onClick={handleGoogleAuth}
      gap={2}
    >
      <Image src="/google.png" height={7} />
      <Span fontSize={15} cursor={"pointer"}>
        {isLogin?"Log in":"Sign up"} with Google
      </Span>
    </Flex>
  );
};

export default Google;
