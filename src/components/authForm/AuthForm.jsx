import {Box, Span, Flex} from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';
import Google from './Google';
// testing branch change
export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const handleLogin = () => {
    setIsLogin(!isLogin)
  }
  return (
    <Box>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spacing={4}>
          <Image marginTop={7} marginBottom={7} src={"/logo1.png"} h={14} alt='IGlogo' cursor={"pointer"} />
          {isLogin?<Login/>:<SignUp/>}
          <Flex alignItems={'center'} justifyContent={"center"} my={4} gap={1} w={'full'}>
            <Box flex={2} h={".1px"} bg={"gray.500"}/>
            <Text fontSize={12} mx={1} color={"gray.400"}>OR</Text>
            <Box flex={2} h={".1px"} bg={"gray.500"}/>
          </Flex>
          
          <VStack spacing={4}>
            <Google isLogin={isLogin}/>
            <Text marginBottom={4} fontSize={14} cursor={"pointer"}>{isLogin ? "Forgot password?" : null}</Text>
            <Text maxWidth={260} fontSize={10} cursor={"pointer"} textAlign={'center'}>You can also <Span fontWeight={'bold'} _hover={{textDecoration:"underline"}}>report content you believe is unlawful</Span> in your country without logging in.</Text>
          </VStack>
          
        </VStack>
      </Box>
      <Box marginTop={5} border={"1px solid gray"} borderRadius={4} padding={5} textAlign={"center"}>
        {isLogin ? "Don't have an account?" : "Already have an account?"} <Span onClick={handleLogin} color="blue.600" cursor={'pointer'}>{isLogin ? "Sign up" : "Log in"}</Span>
      </Box>     
    </Box>
    
  )
}

export default AuthForm;
