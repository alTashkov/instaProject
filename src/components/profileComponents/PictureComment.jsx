import { Avatar } from "@/components/ui/avatar";
import { Flex, Span } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const PictureComment = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);
  if (isLoading) return <CommentSkeleton />;

  return (
    <Flex p={3} h={"20%"} gap={3} w={"100%"} pl={10} mb={3}>
      <Link to={`/${userProfile?.username}`}>
        <Avatar src={userProfile?.profilePicURL}></Avatar>
      </Link>
      <Flex direction={"column"}>
        <Link to={`/${userProfile?.username}`}>
          <Span fontWeight={"bold"}>{userProfile?.username}</Span>
        </Link>
        <Span color={"gray.400"} alignSelf={"flex-start"}>
          {timeAgo(comment.createdAt)}
        </Span>
      </Flex>
      <Span>{comment.comment}</Span>
    </Flex>
  );
};

export default PictureComment;

const CommentSkeleton = () => {
  return (
    <Flex>
      <SkeletonCircle w={10} h={10} />
      <Flex flexDir={"column"} gap={1}>
        <Skeleton h={2} w={100}></Skeleton>
        <Skeleton h={2} w={50}></Skeleton>
      </Flex>
    </Flex>
  );
};
