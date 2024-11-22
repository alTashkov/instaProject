/* eslint-disable react/prop-types */
import { GridItem, Flex, Text, Image, Button, Span } from '@chakra-ui/react'
import { VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Avatar } from "@/components/ui/avatar";
import {
  DialogBody,
  DialogContent,
  DialogRoot,
} from "@/components/ui/dialog"
import PictureComment from './PictureComment';
import PostFooter from '../FeedPosts/PostFooter'
const ProfilePost = ({img, username,avatar}) => {

  const [isOpen,setOpen] = useState(false)
  const handleOpen = ()=>{
    setOpen(!isOpen)
  }
  return (
    <>
    <GridItem onClick={handleOpen} cursor={"pointer"} borderRadius={4} border={"1px solid"} borderColor={"whiteAlpha.300"} position={"relative"} aspectRatio={1/1}>
      <Flex opacity={0} _hover={{opacity:1}} position={"absolute"} top={0} left={0} right={0} bottom={0} bg={"blackAlpha.700"} transition={"all 0.3s ease"} zIndex={1} justifyContent={"center"}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={50}>  
          <Flex alignItems={"center"}>
            <Image src={"/heart.png"} h={"40px"}/>
            <Text fontWeight={"bold"} ml={2}>
              72
            </Text>
          </Flex>
          <Flex alignItems={"center"}>
            <Image src={"/comment.png"} h={"40px"}/>
            <Text fontWeight={"bold"} ml={2}>
              2
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Image src={img} alt='profilePost' w={"full"} h={"100%"} objectFit={"cover"}/>
    </GridItem>
    <DialogRoot open={isOpen} placement={"center"} size={{base:"md",md:"xl"}} >
        <DialogContent>
          <DialogBody overflowY={{base:"scroll",md:"hidden"}}>
            <Flex flexDirection={{base:"column",md:"row"}} w={"100%"}>
              <Image pt={3} mt={"auto"} borderRadius={10} src={"/postImg.png"} objectFit={"contain"} w={{base:"full",md:"50%"}} height={{base:"50%",sm:"50%",md:"100%"}}></Image>
              <VStack w={{base:"full",md:"50%"}} maxBlockSize={{base:"60vH",sm:"50vH",md:"40vH",lg:"80vH", xl:"55vH"}}>
                <Flex mt={10} mx={"auto"} justifyContent={"space-between"} w={"85%"} alignItems={"center"} flexDirection={"row"} padding={5} h={"10%"} borderBottom={"1px solid"} borderColor={"whiteAlpha.400"}>
                  <Avatar src={avatar}></Avatar>
                  <Span ml={"20px"} fontWeight={"bold"} fontSize={15}>{username}</Span>
                  <Button ml={"auto"} onClick={handleOpen} alignSelf={"flex-end"} bg={"transparent"} color={"white"} fontSize={20} fontWeight={"bold"}>x</Button>
                </Flex>
                <Flex height={"65%"} alignItems={"center"} flexDirection={"column"} justifyContent={"flex-start"} w={"full"} overflowY={"scroll"} mt={2}>
                  <PictureComment username={username} avatar={avatar} comment={"This is my final project!!!"}/>
                  <PictureComment username={username} avatar={avatar} comment={"This is my final project!!!"}/>
                  <PictureComment username={username} avatar={avatar} comment={"This is my final project!!!"}/>
                  <PictureComment username={username} avatar={avatar} comment={"This is my final project!!!"}/>
                  <PictureComment username={username} avatar={avatar} comment={"This is my final project!!!"}/>
                  <PictureComment username={username} avatar={avatar} comment={"This is my final project!!!"}/>
                </Flex>
                <Flex pl={{base:5,md:10}} mb={0} pt={5} maxH={"20%"} w={"full"} alignSelf={"flex-start"} mt={"auto"}>
                  <PostFooter isProfilePage={true} modify={false} click={true}/>
                </Flex>
              </VStack>
            </Flex>
          </DialogBody>
        </DialogContent>
    </DialogRoot>
    </>
  )
}

export default ProfilePost