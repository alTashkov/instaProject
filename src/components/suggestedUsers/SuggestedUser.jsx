import { HStack, Text, VStack, Button, Box } from "@chakra-ui/react";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
const SuggestedUser = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(user.uid);
  const authUser = useAuthStore((state) => state.user);
  const onFollowUser = async () => {
    await handleFollowUser(user.uid);
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };
  return (
    <HStack
      justifyContent={"space-between"}
      w="90%"
      alignItems={"center"}
      mt={2}
    >
      <Box display={"flex"} gap={3} alignItems={"center"}>
        <Link to={`/${user.username}`}>
          <Avatar
            src={user.profilePicURL}
            w={{ base: "20px", md: "50px" }}
            h={{ base: "20px", md: "50px" }}
          />
        </Link>
        <VStack spacing={2} alignItems={"flex-start"}>
          <Link to={`/${user.username}`}>
            <Text fontSize={15} fontWeight={"bold"} alignSelf={"flex-start"}>
              {user.fullName}
            </Text>
          </Link>
          <Text alignSelf={"flex-start"} fontSize={12} color={"gray.400"}>
            {user.followers?.length}{" "}
            {user.followers?.length === 1 ? "follower" : "followers"}
          </Text>
        </VStack>
      </Box>
      {authUser.uid !== user.uid && (
        <Button
          bg={"transparent"}
          onClick={onFollowUser}
          pe={0}
          loading={isUpdating}
        >
          <Text color={"blue.400"} _hover={{ color: "white" }}>
            {isFollowing ? "Unfollow" : "Follow"}
          </Text>
        </Button>
      )}
      {authUser.uid === user.uid && <Text color={"gray.400"}>You</Text>}
    </HStack>
  );
};

export default SuggestedUser;
