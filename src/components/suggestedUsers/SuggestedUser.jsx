import { HStack, Text, VStack, Button, Box } from '@chakra-ui/react'
import React from 'react'
import { Avatar } from "@/components/ui/avatar";

const SuggestedUser = ({username, img, followers}) => {
  return (
    <HStack justifyContent={"space-between"} w="90%" alignItems={"center"} mt={2}>
        <Box display={"flex"} gap={3} alignItems={"center"}>
            <Avatar src={img} w={{base:"20px", md:"50px"}} h={{base:"20px", md:"50px"}}/>
            <VStack spacing={2}>
                <Text fontSize={15} fontWeight={"bold"}>{username}</Text>
                <Text alignSelf={"flex-start"} fontSize={12} color={"gray.400"}>{followers} followers</Text>
            </VStack>
        </Box>
        <Button bg={"transparent"} onClick={"1"} pe={0}><Text color={"blue.400"} _hover={{color:"white"}}>Follow</Text></Button>
        
    </HStack>
  )
}

export default SuggestedUser