import React from "react";
import { Flex, Span } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { Avatar } from "@/components/ui/avatar";
const Profile = () => {
    const authUser = useAuthStore((state) => state.user);
  return (
    <Link to={`/${authUser?.username}`} cursor={"pointer"}>
      <Flex
        width={"6.5vw"}
        borderRadius={6}
        _hover={{ bg: "whiteAlpha.400" }}
        alignItems={"center"}
      >
        <Avatar
          height={{base:"3vh",sm:"3.5vh",md:"4vh"}}
          width={{base:"7vw",sm:"3vw",md:"4vw",lg:"2vw"}}
          src={`${authUser.profilePicURL || ""}`}
          marginRight={3}
          alignSelf={"center"}
          justifySelf={"center"}
        />
        <Span display={{ base: "none", lg: "block" }} fontSize={18}>
          Profile
        </Span>
      </Flex>
    </Link>
  );
};

export default Profile;
