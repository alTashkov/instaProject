import React from 'react'
import { Container, Flex, Box } from '@chakra-ui/react'
import FeedPosts from '@/components/FeedPosts/FeedPosts.jsx'
import SuggestedUsers from '@/components/suggestedUsers/SuggestedUsers.jsx'
import Comments from '../components/profileComponents/Comments'
const HomePage = () => {
  return (
    <Container w={"container.lg"}>
      <Flex gap={15}>
        <Box display={"flex"} flex={2} py={10} marginLeft={{base:null,xs:"30px", md:"10px"}}>
          <FeedPosts/>
        </Box>
        <Box flex={3} mr={15} display={{base:"none", md:"block"}} maxW={"300px"}>
          <SuggestedUsers/>
        </Box>
      </Flex>
    </Container>
  )
}

export default HomePage