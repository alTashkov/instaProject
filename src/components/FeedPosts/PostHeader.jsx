import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { timeAgo } from "../../utils/timeAgo";
import useFollowUser from "../../hooks/useFollowUser";
import { Link } from "react-router-dom";
const PostHeader = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  const { isFollowing, handleFollowUser } = useFollowUser(post.createdBy);
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"full"}
      justifyItems={"center"}
    >
      <Flex alignItems={"center"} gap={2} marginBottom={4}>
        <Link to={`/${userProfile?.username}`}>
          <Avatar
            src={userProfile?.profilePicURL}
            h={{ base: "30px", md: "40px" }}
            w={{ base: "30px", md: "40px" }}
          />
        </Link>
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          <Link to={`/${userProfile?.username}`}>{userProfile?.username}</Link>
          <Box color={"gray.400"} fontSize={{ base: 10, md: 13 }}>
            {timeAgo(post.createdAt)}
          </Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"} onClick={handleFollowUser}>
        <Text
          color={"blue.400"}
          fontSize={{ base: 10, md: 13 }}
          letterSpacing={1}
          fontWeight={"bold"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Text>
      </Box>
    </Flex>
  );
};

export default PostHeader;
