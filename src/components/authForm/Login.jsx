import { Input, Button } from '@chakra-ui/react'
import {Toaster} from "@/components/ui/toaster"
import { useState } from 'react'
const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        confirmPassword:""
    })
    return (  
        <>
            <Toaster></Toaster>
            <Input size={"sm"} fontSize={12} placeholder='Email:' type='email' value={inputs.email} onChange={(e) => setInputs({...inputs,email:e.target.value})}/>
            <Input size={"sm"} fontSize={12} placeholder='Password:' type='password' value={inputs.password} onChange={(e) => setInputs({...inputs,password:e.target.value})}/>
            <Button borderRadius={10} height={7} width={270} background={'blue.500'} color={'white'}>Log in</Button>
        </>
    )
}

export default Login