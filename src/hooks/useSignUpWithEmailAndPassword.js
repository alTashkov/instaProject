import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {auth} from '../firebase/firebase'
import { doc, setDoc } from 'firebase/firestore';
import { fireStore } from "../firebase/firebase";
const useSignUpWithEmailAndPassword = () => {
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const signup = async (inputs) => {
        
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName){
            console.log("Please fill all the fields!")
            return
        }
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password)
            if(!newUser && error){
                console.log(error)
                return
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
                localStorage.setItem("user-info",JSON.stringify(userDoc))
            }
        } 
        catch (error) {
            console.log(error)
        }
    }
    return [
        loading,
        error,
        signup
    ];
}

export default useSignUpWithEmailAndPassword;