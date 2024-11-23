import { Box, Text, Button, VStack, Flex, Link } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";
import { useEffect, useState } from "react";

const SuggestedHeader = () => {
  const { handleLogout } = useLogout();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // useEffect to load user data
  useEffect(() => {
    const loadUserInfo = () => {
      const storedUserInfo = localStorage.getItem("user-info");
      if (storedUserInfo) {
        setUserData(JSON.parse(storedUserInfo));
      }
      setIsLoading(false);
    };
    loadUserInfo();
  }, []); // Runs only once when component mounts

  const authUser = useAuthStore((state) => state.user);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!userData) {
    return (
      <Text color="red.300" fontWeight="bold">
        User data is missing!
      </Text>
    );
  }

  return (
    <VStack w={"full"}>
      <Flex w={"90%"} justifyContent={"space-between"} mt={5}>
        <Box display={"flex"} alignItems={"center"} gap={3}>
          {/* Use Link correctly with userData */}
          <Link href={`/${authUser?.username}`} gap={4}>
            <Avatar
              h={{ base: "30px", md: "40px" }}
              w={{ base: "30px", md: "40px" }}
              src={userData.profilePicURL || ""}
            />
            <Text fontWeight={"bold"}>{userData.username || "Guest"}</Text>
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
        <Button bg={"transparent"} alignSelf={"flex-end"}>
          <Text
            fontWeight={"500"}
            fontSize={15}
            color={"white"}
            _hover={{ color: "gray.400" }}
          >
            See all
          </Text>
        </Button>
      </Flex>
    </VStack>
  );
};

export default SuggestedHeader;
