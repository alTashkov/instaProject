import { Box, Flex, Button } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { Span } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
//tooltip problem <Tooltip display={{base:"block",md:"none"}} openDelay={500} closeDelay={100} hasArrow content={"Log out"} positioning={{placement:"right-end"}}></Tooltip>
export const Sidebar = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  const authUser = useAuthStore((state) => state.user);
  return (
    <Box>
      <VStack
        spacing={10}
        alignItems={{ base: "center", md: "flex-start" }}
        width={"16vw"}
        borderRight={"1px solid gray"}
        h={"100vh"}
        position={"fixed"}
        padding={10}
      >
        <Box marginBottom={10} overflow={"hidden"}>
          <Image h={{ base: "0", xl: "40px" }} src={"/logo1.png"} />
        </Box>
        <Flex
          width={"6.5vw"}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.400" }}
          alignItems={"center"}
        >
          <Image h={"4vh"} src={"/home2.png"} marginRight={3} />
          <Link to={"/"} cursor={"pointer"}>
            <Span display={{ base: "none", lg: "block" }} fontSize={18}>
              Home
            </Span>
          </Link>
        </Flex>
        <Flex
          width={"6.5vw"}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.400" }}
          alignItems={"center"}
        >
          <Image h={"4vh"} src={"/search.png"} marginRight={3} />
          <Link to={"/"} cursor={"pointer"}>
            <Span display={{ base: "none", lg: "block" }} fontSize={18}>
              Search
            </Span>
          </Link>
        </Flex>
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
        <Link to={`/${authUser?.username}`} cursor={"pointer"}>
          <Flex
            width={"6.5vw"}
            borderRadius={6}
            _hover={{ bg: "whiteAlpha.400" }}
            alignItems={"center"}
          >
            <Image h={"4vh"} src={"/profile.png"} marginRight={3} />
            <Span display={{ base: "none", lg: "block" }} fontSize={18}>
              Profile
            </Span>
          </Flex>
        </Link>
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
      </VStack>
    </Box>
  );
};

export default Sidebar;
