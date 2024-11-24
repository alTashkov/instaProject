import React from "react";
import { Flex, Image, Span } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Link to={"/"} cursor={"pointer"}>
      <Flex
        width={"6.5vw"}
        borderRadius={6}
        _hover={{ bg: "whiteAlpha.400" }}
        alignItems={"center"}
      >
        <Image h={"4vh"} src={"/home2.png"} marginRight={3} />

        <Span display={{ base: "none", lg: "block" }} fontSize={18}>
          Home
        </Span>
      </Flex>
    </Link>
  );
};

export default Home;
