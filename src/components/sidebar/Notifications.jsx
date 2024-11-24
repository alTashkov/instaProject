import React from "react";
import { Flex, Image, Span } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Notifications = () => {
  return (
    <Flex
      width={{ base: "6.5vw", md: "9vw" }}
      borderRadius={6}
      _hover={{ bg: "whiteAlpha.400" }}
      alignItems={{ base: "flex-start", lg: "center" }}
    >
      <Image h={"4vh"} src={"/bell1.png"} marginRight={3} />
      <Link to={"/"} cursor={"pointer"}>
        <Span
          display={{ base: "none", lg: "block" }}
          fontSize={{ lg: 16, xl: 18 }}
        >
          Notifications
        </Span>
      </Link>
    </Flex>
  );
};

export default Notifications;
