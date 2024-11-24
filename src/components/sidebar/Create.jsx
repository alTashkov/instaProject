import React from "react";
import { Flex,Image,Span } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Create = () => {
  return (
    <Flex
      width={"6.5vw"}
      borderRadius={6}
      _hover={{ bg: "whiteAlpha.400" }}
      alignItems={"center"}
    >
      <Image
        _hover={{ base: { bg: "whiteAlpha.400" }, md: null }}
        h={"4vh"}
        src={"/create1.png"}
        marginRight={3}
      />
      <Link to={"/"} cursor={"pointer"}>
        {/* да wrap-на целия флекс с линка!!! */}
        <Span
          display={{ base: "none", lg: "block" }}
          fontSize={{ lg: 16, xl: 18 }}
        >
          Create
        </Span>
      </Link>
    </Flex>
  );
};

export default Create;
