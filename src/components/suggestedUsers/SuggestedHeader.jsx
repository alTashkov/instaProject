import { Box, Text, Button, VStack, Flex, Link } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { Link as RouterLink } from "react-router-dom";

const SuggestedHeader = ({ showAll, toggleShowAll }) => {
  const { handleLogout } = useLogout();
  const authUser = useAuthStore((state) => state.user);

  return (
    <VStack w={"full"}>
      <Flex w={"90%"} justifyContent={"space-between"} mt={5}>
        <Box display={"flex"} alignItems={"center"} gap={3}>
          <Link as={RouterLink} to={`/${authUser?.username}`} gap={4}>
            <Avatar
              h={{ base: "30px", md: "40px" }}
              w={{ base: "30px", md: "40px" }}
              src={authUser?.profilePicURL || ""}
            />
            <Text fontWeight={"bold"}>{authUser?.username || "Guest"}</Text>
          </Link>
        </Box>
        <Button bg={"transparent"} onClick={handleLogout}>
          <Text color={"blue.400"} fontWeight={"bold"} _hover={{ color: "white" }}>
            Log out
          </Text>
        </Button>
      </Flex>

      <Flex
        w={"full"}
        justifyContent={"space-between"}
        mt={2}
        alignItems={"center"}
        gap={7}
      >
        <Text fontWeight={"400"} color={"gray.500"}>
          Suggested for you
        </Text>
        
        <Button
          bg={"transparent"}
          alignSelf={"flex-end"}
          onClick={toggleShowAll} // Toggling the showAll state
        >
          <Text
            fontWeight={"500"}
            fontSize={15}
            color={"white"}
            _hover={{ color: "gray.400" }}
          >
            {showAll ? "See less" : "See all"}
          </Text>
        </Button>
      </Flex>
    </VStack>
  );
};

export default SuggestedHeader;
