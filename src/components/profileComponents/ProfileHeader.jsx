/* eslint-disable react/prop-types */
import {Flex, Text, Button, VStack, Span } from '@chakra-ui/react'
import { Avatar } from "@/components/ui/avatar";
import {AvatarGroup} from "@/components/ui/avatar";
const ProfileHeader = ({img, username}) => {
  return (
    <Flex gap={{base:4,sm:10}} py={10} direction={{base:"column", sm:"row"}}>
        <AvatarGroup size={{base:"xl",md:"2xl"}} alignSelf={"flex-start"} mx={"auto"}><Avatar h={{base:"70px",md:"120px"}} w={{base:"70px",md:"120px"}} src={img}></Avatar></AvatarGroup>
        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
            <Flex gap={4} direction={{base:"column", sm:"row"}} justifyContent={{base:"center", sm:"flex-start"}} alignItems={"center"} w={"full"}>
                <Text fontWeight={"bold"}>{username}</Text><Button borderRadius={6} bg={"white"} cursor={"pointer"} color={"black.400"} fontWeight={"bold"} _hover={{bg:"whiteAlpha.800"}} size={{base:"xs",md:"sm"}}>Edit profile</Button>
            </Flex>
            <Flex alignItems={"center"} gap={{base:2, sm:4}}>
                <Text>
                    <Span fontWeight={"bold"} mr={1}>4</Span>
                    Posts
                </Text>
                <Text>
                    <Span fontWeight={"bold"} mr={1}>1.2K</Span>
                    followers
                </Text>
                <Text>
                    <Span fontWeight={"bold"} mr={1}>3K</Span>
                    following
                </Text>
            </Flex>
            <Flex alignItems={"center"} gap={4}>
                <Text fontSize={"sm"} fontWeight={"bold"}>Alexandar Tashkov</Text>
            </Flex>
            <Text fontSize={"sm"}>This is my final project for this course, and i am going to finish it soon.</Text>
        </VStack>
    </Flex>
  )
}

export default ProfileHeader