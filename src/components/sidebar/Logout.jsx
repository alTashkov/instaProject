import React from "react";
import { Flex, Image, Span } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import useLogout from "../../hooks/useLogout";
const Logout = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  return (
    <Flex
      width={"8vw"}
      borderRadius={6}
      _hover={{ bg: "whiteAlpha.400" }}
      marginTop={"auto"}
      alignItems={"center"}
    >
      {" "}
      <Image h={"4vh"} src={"/logout1.png"} marginRight={3} />
      <Tooltip
        visibility={{ base: null, md: "none" }}
        openDelay={500}
        closeDelay={100}
        hasArrow
        content={"Log out"}
        positioning={{ placement: "right-end" }}
      >
        <Flex
          w={{ base: 10, md: "full" }}
          to={"/auth"}
          cursor={"pointer"}
          onClick={handleLogout}
        >
          <Button
            display={{ base: "none", lg: "block" }}
            fontSize={18}
            variant={"ghost"}
            _hover={{ bg: "transparent" }}
            isLoading={isLoggingOut}
          >
            Log out
          </Button>
        </Flex>
      </Tooltip>
    </Flex>
  );
};

export default Logout;
