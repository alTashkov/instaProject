import { Flex, Span, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Avatar } from "@/components/ui/avatar";
import { timeAgo } from "../../utils/timeAgo";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
const Caption = ({post}) => {
    const {userProfile} = useGetUserProfileById(post.createdBy)
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
          {timeAgo(post.createdAt)}
        </Span>
      </Flex>
      <Span>
            {post.caption}
        </Span>
    </Flex>
  )
}

export default Caption