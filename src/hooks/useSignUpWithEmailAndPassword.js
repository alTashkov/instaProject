import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {auth} from '../firebase/firebase'
import { doc, setDoc } from 'firebase/firestore';
import { fireStore } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";

const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth);
    const loginUser = useAuthStore(state=>state.login)
    const logoutUser = useAuthStore(state=>state.logout)
    const signup = async (inputs) => {
        const showToast = useShowToast();
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName){
            showToast("Error","Please fill in all the fields!","error");
            return
        }
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password)
            if(!newUser && error){
                showToast("Error",error.message,"error");
                return;
            }
            else if(newUser) {
                const userDoc = {
                    uid:newUser.user.uid,
                    email:inputs.email,
                    username:inputs.username,
                    fullName:inputs.fullName,
                    bio:"",
                    profilePicURL:"",
                    followers:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now()
                }
                await setDoc(doc(fireStore,"users",newUser.user.uid),userDoc);
                localStorage.setItem("user-info",JSON.stringify(userDoc));
                loginUser(userDoc);
            }
        } 
        catch (error) {
            showToast("Error",error.message,"error");
        }
    }
    return [
        loading,
        error,
        signup
    ];
}

export default useSignUpWithEmailAndPassword;