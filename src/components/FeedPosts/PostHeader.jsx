import { Flex, Box, Text} from '@chakra-ui/react';
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
const PostHeader = ({username, avatar}) => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} justifyItems={"center"}>
        <Flex alignItems={"center"} gap={2} marginBottom={4}>
            <Avatar src={avatar} h={{base:"30px", md:"40px"}} w={{base:"30px", md:"40px"}}/>
            <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                {username}
                <Box color={"gray.400"} fontSize={{base:10, md:13}}>• 2d</Box>
            </Flex>
        </Flex>
        <Box cursor={"pointer"}><Text color={"blue.400"} fontSize={{base:10, md:13}} letterSpacing={1} fontWeight={"bold"} _hover={{color:"white"}}  transition={"0.2s ease-in-out"}>Unfollow</Text></Box>
    </Flex>
  )
}

export default PostHeader