import { VStack, Spinner } from "@chakra-ui/react";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers"; // Custom hook to fetch users
import SuggestedHeader from "./SuggestedHeader";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers(); // Use the custom hook to fetch users
  
  // Display loading spinner if data is still being fetched
  if (isLoading) {
    return <Spinner size="lg" />;
  }

  return (
    <VStack alignItems="flex-start">
      <SuggestedHeader/>
      {suggestedUsers.length > 0 ? (
        suggestedUsers.map((user) => <SuggestedUser key={user.id} user={user} />)
      ) : (
        <p>No users to suggest</p>
      )}
    </VStack>
  );
};

export default SuggestedUsers;
