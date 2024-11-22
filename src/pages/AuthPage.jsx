import { Box, Container, Image, VStack } from '@chakra-ui/react';
import {AuthForm} from '../components/authForm/AuthForm.jsx'
import {Flex} from '@chakra-ui/react'
import React from 'react'

export const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={"4"}>
        <Container maxW={"container.md"} padding={0}>
            <Flex justifyContent={"center"} alignItems={"center"} gap={10}> 
                {/* left */}
                <Box display={{base:"none", md:"block"}}>
                    <Image src='/phone.png' height={450} alt='PhoneLeft'/>
                </Box>
                {/* right */}
                <VStack spacing={4} align={"stretch"}>
                    <AuthForm/>
                    <Box textAlign={"center"} color={"white"} marginTop={2}>
                        Get the app.
                    </Box>
                    <Flex gap={5} justifyContent={"center"} marginTop={2}>
                        <Image src='/playStore.png' h={"50px"} alt='PlayRight'/>
                        <Image border={"1px solid gray"} src='/microsoft.png' h={"50px"} alt='MicroRight'/>
                    </Flex>
                    
                </VStack>
            </Flex>
            
        </Container>
    </Flex>
    
    
  )
}

export default AuthPage;