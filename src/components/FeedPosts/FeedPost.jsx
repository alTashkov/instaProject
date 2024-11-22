import { Box, Image } from '@chakra-ui/react';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';
const FeedPost = ({img, username, avatar}) => {
  return (
    <>
        <PostHeader username={username} avatar={avatar}/>
        <Box>
           <Image borderRadius={4} h={"full"} w="full" src={img} alt={username} pe={0}/> 
        </Box>
        <PostFooter username={username}/>
    </>
  )
}

export default FeedPost;