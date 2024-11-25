import { VStack, Spinner, Text } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers"; // Custom hook to fetch users
import SuggestedHeader from "./SuggestedHeader";
import { useState } from "react";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers(); // Use the custom hook to fetch users
  const [showAll, setShowAll] = useState(false); // State to control "See all" toggle

  // Display loading spinner if data is still being fetched
  if (isLoading) {
    return <Spinner size="lg" />;
  }

  // Slice the users based on the showAll state
  const displayedUsers = showAll ? suggestedUsers : suggestedUsers.slice(0, 3);
  const toggleShowAll = () => setShowAll((prev) => !prev);

  return (
    <VStack alignItems="flex-start">
      <SuggestedHeader showAll={showAll} toggleShowAll={toggleShowAll} />
      
      <VStack w={"full"} mt={3} spacing={3}>
        
        {displayedUsers.length === 0 ? (
          <Text>No users to suggest</Text>
        ) : (
          displayedUsers.map((user) => <SuggestedUser key={user.id} user={user} />)
        )}
      </VStack>
    </VStack>
  );
};

export default SuggestedUsers;
