/* eslint-disable react/prop-types */
import { Box, Image } from "@chakra-ui/react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
const FeedPost = ({ post }) => {
  return (
    <>
      <PostHeader post={post} />
      <Box>
        <Image
          borderRadius={4}
          maxH={"500px"}
          w="full"
          src={post.image}
          alt={"feedPostImg"}
          pe={0}
        />
      </Box>
      <PostFooter post={post} />
    </>
  );
};

export default FeedPost;
