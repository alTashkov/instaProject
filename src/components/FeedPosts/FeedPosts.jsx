import { Container, VStack, Flex, Skeleton, Box } from "@chakra-ui/react";
import FeedPost from "./FeedPost";
import { SkeletonCircle } from "@/components/ui/skeleton";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();
  return (
    <Container
      maxW={"600px"}
      py={10}
      px={5}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      {isLoading &&
        [0, 1, 2].map((_, idx) => (
          <VStack
            key={idx}
            gap={4}
            alignItems={"flex-start"}
            mb={10}
            w={"full"}
          >
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton h={"10px"} w={"200px"} />
                <Skeleton h={"10px"} w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w="full">
              <Box h="500px">content</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading &&
        posts.length > 0 &&
        posts.map((post) => <FeedPost key={post.id} post={post} />)}
    </Container>
  );
};

export default FeedPosts;
