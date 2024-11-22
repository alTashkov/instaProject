import React, { useEffect } from 'react';
import { Container, VStack, Flex, Skeleton, Box } from '@chakra-ui/react';
import FeedPost from './FeedPost';
import {SkeletonCircle} from '@/components/ui/skeleton';
import { useState } from 'react';

const FeedPosts = () => {
  const [isLoading, setLoading] = useState(true)
  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  },[])
  return (
    <Container maxW={"600px"} py={10} px={5} display={"flex"} flexDirection={"column"} alignItems={"center"}>
      {isLoading && [0,1,2,3].map((_,idx) => (
        <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10} w={"full"}>
          <Flex gap={2}>
            <SkeletonCircle size={10}/>
            <VStack gap={2} alignItems={"flex-start"}>
              <Skeleton h={"10px"} w={"200px"}/>
              <Skeleton h={"10px"} w={"200px"}/>
            </VStack>
          </Flex>
          <Skeleton w="full">
            <Box h="500px">content</Box>
          </Skeleton>
        </VStack>
      ))}
      
      {!isLoading && (
        <>
          <FeedPost
            img="/postImg.png"
            username="FinalProject"
            avatar = "/avat.png"
          />
          <FeedPost
            img={"/postImg2.png"}
            username={"abraCadabra"}
            avatar={"/avat2.png"}
          />
        </>
      )}
    </Container>
  )
}

export default FeedPosts