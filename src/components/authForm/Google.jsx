import React from 'react'
import { Flex, Image, Span } from '@chakra-ui/react'
const Google = ({isLogin}) => {
  return (
    <Flex justifyContent={"center"} marginBottom={isLogin ? "4" : "0"} width={190} color={"blue.600"} alignItems={"center"} gap={2}><Image src='/google.png' height={7}/><Span fontSize={15} cursor={'pointer'}>Log in with Google</Span></Flex>
  )
}

export default Google