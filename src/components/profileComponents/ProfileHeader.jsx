/* eslint-disable react/prop-types */
import { Flex, Text, Button, VStack, Span } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import { useState } from "react";
const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  console.log("Profile header name: " + userProfile.username);
  const authUser = useAuthStore((state) => state.user);
  const visitingOwnProfileAndAuth =
    authUser && authUser.username === userProfile.username;
  const visitingAnotherUserProfileAndAuth =
    authUser && authUser.username !== userProfile.username;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  }
  //to fix the saving problem 
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
    >
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar
          h={{ base: "70px", md: "120px" }}
          w={{ base: "70px", md: "120px" }}
          src={userProfile.profilePicURL}
        ></Avatar>
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          gap={4}
          direction={{ base: "column", sm: "row" }}
          justifyContent={{ base: "center", sm: "flex-start" }}
          alignItems={"center"}
          w={"full"}
        >
          <Text fontWeight={"bold"}>{userProfile.username}</Text>
          {visitingOwnProfileAndAuth && (
            <Button
              borderRadius={6}
              bg={"white"}
              cursor={"pointer"}
              color={"black.400"}
              fontWeight={"bold"}
              _hover={{ bg: "whiteAlpha.800" }}
              size={{ base: "xs", md: "sm" }}
              onClick={handleOpen}
            >
              Edit profile
            </Button>
            
          )}
          {open && (
            <EditProfile isOpen={open} onClose={handleOpen}/>
          )}
          {visitingAnotherUserProfileAndAuth && (
            <Button
              borderRadius={6}
              bg={"blue.500"}
              cursor={"pointer"}
              color={"white"}
              fontWeight={"bold"}
              _hover={{ bg: "blue.600" }}
              size={{ base: "xs", md: "md" }}
            >
              Follow
            </Button>
          )}
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text>
            <Span fontWeight={"bold"} mr={1}>
              {userProfile.posts.length}
            </Span>
            posts
          </Text>
          <Text>
            <Span fontWeight={"bold"} mr={1}>
              {userProfile.followers.length}
            </Span>
            followers
          </Text>
          <Text>
            <Span fontWeight={"bold"} mr={1}>
              {userProfile.following.length}
            </Span>
            following
          </Text>
        </Flex>
        <Flex alignItems={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile.fullName}
          </Text>
        </Flex>
        <Text fontSize={"sm"}>{userProfile.bio}</Text>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
