import { VStack, Image, Box, Flex, Text, Span, Input, Button } from '@chakra-ui/react';
import { InputGroup } from "@/components/ui/input-group";
import React, { useState } from 'react';

const PostFooter = ({username, click = false, modify=true, isProfilePage=false}) => {
  const [liked, setLiked] = useState(false);
  const [clickComment, setClicked] = useState(click);
  const [likes, setLikes] = useState(1000);
  const handleLike = () => {
    if(liked) {
      setLiked(false);
      setLikes(likes-1);
    }
    else {
      setLikes(likes+1);
      setLiked(true);
    }
  }
  const handleClick = () => {
    if(modify){
      setClicked(!clickComment);
    }
    
  }
 
  return (
    <VStack w={"full"} mb={10} gap={2} pt={0} marginTop={"auto"}>
      <Flex justifyContent={"flex-start"} w={"full"}><Image onClick={handleLike} h={9} src={!liked ? "/heart.png" : "heart2.png"}/><Image onClick={handleClick} h={9} src={"/comment.png"}/></Flex>
      <Box w={"full"}><Text fontSize={12} paddingLeft={2} fontWeight={"600"}>{likes} likes</Text></Box>
      {!isProfilePage && (
        <Text fontSize={12} fontWeight={600} w={"full"} pl={2}>
        {username}{" "}
        <Span fontWeight={400}>
            This is my final project.
        </Span>
        <Text fontSize={12} color={"gray"}> View all 103 comments</Text>
      </Text>
      )}
      <Flex w={"full"} alignItems={"center"} gap={2} justifyContent={"space-between"} pl={2} display={!clickComment ? "none" : "flex"}>
        <InputGroup w="full" endElement={<Button pe={0} bg={"transparent"} fontSize={"14"} color={"blue.500"} fontWeight={600} cursor={"pointer"} _hover={{color:"white"}}>
                Post
            </Button>}>
          <Input variant={"flushed"} placeholder={"Add a comment..."} fontSize={14}/>
        </InputGroup>
      </Flex>
      
    </VStack>
  )
}

export default PostFooter