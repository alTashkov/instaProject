import { Container, Flex, VStack, Link, Text, Box } from "@chakra-ui/react";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import {Skeleton, SkeletonCircle} from '@/components/ui/skeleton'
import ProfilePosts from "../components/profileComponents/ProfilePosts";
import ProfileTabs from "../components/profileComponents/PorfileTabs";
import useGetUserProfileByUserName from "../hooks/useGetUserProfileByUserName";
import { useParams } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const ProfilePage = () => {
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUserName(username);
  const userNotFound = !isLoading && !userProfile;
  
  if (userNotFound) return <UserNotFound />;

  return (
    <Container>
      <Toaster/>
      <Flex
        py={10}
        px={4}
        pl={{ base: 4, md: 10 }}
        w={"full"}
        mx={"auto"}
        flexDirection={"column"}
      >
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        w={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.400"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default ProfilePage;

const UserNotFound = () => {
  return (
    <Flex justifyContent={"center"} flexDir={"column"} w="full">
      <Text fontSize={"xl"} mx={"auto"}>User not found</Text>
      <Link href={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>Go back</Link>
    </Flex>
  )
}

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
			gap={{ base: 4, sm: 10 }}
			py={10}
			direction={{ base: "column", sm: "row" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<SkeletonCircle size='24' />

			<VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
				<Skeleton height='12px' width='150px' />
				<Skeleton height='12px' width='100px' />
			</VStack>
		</Flex>
  )
}
