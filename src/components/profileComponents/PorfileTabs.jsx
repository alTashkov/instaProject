import { Flex, Box, Text, Image } from '@chakra-ui/react'
import React from 'react'
import { BsBookmark, BsGrid3X3 } from 'react-icons/bs'

const PorfileTabs = () => {
  return (
    <Flex w={"full"} justifyContent={"center"} gap={{base:4,sm:10}} textTransform={"uppercase"} fontWeight={"bold"}>
        <Flex borderTop={"1px solid white"} alignItems={"center"} p={3} gap={2} cursor={"pointer"}>
            <Box fontSize={20}>
                <BsGrid3X3/>
            </Box>
            <Text fontSize={15} display={{base:"none",sm:"block"}}>
                Posts
            </Text>
        </Flex>
        <Flex alignItems={"center"} p={3} gap={2} cursor={"pointer"}>
            <Box fontSize={20}>
                <BsBookmark/>
            </Box>
            <Text fontSize={15} display={{base:"none",sm:"block"}}>
                Saved
            </Text>
        </Flex>
        <Flex alignItems={"center"} p={3} gap={1} cursor={"pointer"}>
            <Box fontSize={20}>
                <Image h={"40px"} src={"/heart.png"}/>
            </Box>
            <Text fontSize={15} display={{base:"none",sm:"block"}}>
                Likes
            </Text>
        </Flex>
    </Flex>
  )
}

export default PorfileTabs