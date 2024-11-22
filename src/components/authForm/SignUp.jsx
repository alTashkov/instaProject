import{ useState } from 'react'
import { Input, Button } from '@chakra-ui/react'
import { PasswordInput } from "@/components/ui/password-input"
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword.js'
import { Alert } from "@/components/ui/alert"
const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName:"",
        username:"",
        email: "",
        password: "",
    })
    const [loading,error,signup] = useSignUpWithEmailAndPassword();
    
    return (
        <>
            <Input fontSize={12} size={"sm"} placeholder='Email:' type='email' value={inputs.email} onChange={(e) => setInputs({...inputs,email:e.target.value})}/>
            <Input fontSize={12} size={"sm"} placeholder='Username:' type='text' value={inputs.username} onChange={(e) => setInputs({...inputs,username:e.target.value})}/>
            <Input fontSize={12} size={"sm"} placeholder='Full Name:' type='text' value={inputs.fullName} onChange={(e) => setInputs({...inputs,fullName:e.target.value})}/>
            <PasswordInput fontSize={12} placeholder='Password:' value={inputs.password} size={"sm"} onChange={(e) => setInputs({...inputs,password:e.target.value})}/>
            {error && (
                <Alert status="error" fontSize={13} p={2} borderRadius={4}>
                    {error.message}
                </Alert>
            )}    
            <Button borderRadius={10} height={7} width={270} background={'blue.500'} color={'white'} isLoading={loading} onClick={()=>signup(inputs)}>Sign up</Button>
        </>
  )
}

export default SignUp;