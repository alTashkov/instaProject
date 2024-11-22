/* eslint-disable react/prop-types */
import { Avatar } from "@/components/ui/avatar";
import { Flex, Span} from '@chakra-ui/react'
const PictureComment = ({username,avatar,comment}) => {
  return (
    
    <Flex p={3} h={"100%"} gap={3} w={"85"}>
        <Avatar src={avatar}></Avatar>
        <Flex direction={"column"}>
            <Span fontWeight={"bold"}>{username}</Span>
            <Span color={"gray.400"} alignSelf={"flex-start"}>1d ago</Span>
        </Flex>
        <Span>{comment}</Span>
    </Flex>
    
  )
}

export default PictureComment