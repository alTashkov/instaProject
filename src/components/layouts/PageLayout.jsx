import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import {Sidebar} from "@/components/sidebar/Sidebar.jsx";
import { useLocation } from 'react-router-dom';
export const PageLayout = ({children}) => {

  const {pathname} = useLocation();
  return (
    <Flex>
        {pathname !== "/auth" ? (
          <Box h={"100vh"} w={{base:"100px", md:"240px",lg:"300px"}}>
            <Sidebar/>
          </Box>
        ) : null}
        <Box flex={1} w={{base:"calc(100%-70px", md:"calc(100%-240px)", lg:"calc(100%-300px)"}}>
            {children}
        </Box>
    </Flex>
  )
}


export default PageLayout;
