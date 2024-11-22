import {  Box, Text, Button, VStack, Flex } from '@chakra-ui/react'
import { Avatar } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
const SuggestedHeader = ({username, img}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/auth")
    }   
    return (
        <VStack w={"full"}>
            <Flex w={"90%"} justifyContent={"space-between"} mt={5}>
                <Box display={"flex"} alignItems={"center"} gap={3}><Avatar h={{base:"30px", md:"40px"}} w={{base:"30px", md:"40px"}} src={img}/><Text fontWeight={"bold"}>{username}</Text></Box>
                <Button bg={"transparent"} onClick={handleClick}><Text color={"blue.400"} fontWeight={"bold"} _hover={{color:"white"}} >Log out</Text></Button>
            </Flex>
            <Flex w={"full"} justifyContent={"space-between"} mt={2} alignItems={"center"} gap={7}>
                <Text fontWeight={"400"} color={"gray.500"}>Suggested for you</Text>
                <Button bg={"transparent"} alignSelf={"flex-end"}><Text fontWeight={"500"} fontSize={15} color={"white"} _hover={{color:"gray.400"}}>See all</Text></Button>
            </Flex>
        </VStack>
        
    )
}
//line 16 - не мога да сетна gap само на този елемент, засяга се и горния hStack
export default SuggestedHeader