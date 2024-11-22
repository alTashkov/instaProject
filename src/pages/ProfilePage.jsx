import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import ProfileHeader from "../components/profileComponents/ProfileHeader";

import ProfilePosts from "../components/profileComponents/ProfilePosts";
import ProfileTabs from "../components/profileComponents/PorfileTabs";
const ProfilePage = () => {
  return (
    <Container>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        <ProfileHeader username={"al.tashkov"} img={"/avat3.png"} />
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        w={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.400"}
        direction={"column"}
      >
        <ProfileTabs></ProfileTabs>
        <ProfilePosts></ProfilePosts>
      </Flex>
    </Container>
  );
};

export default ProfilePage;
