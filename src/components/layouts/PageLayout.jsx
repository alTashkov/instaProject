/* eslint-disable react/prop-types */
import { Flex, Box } from '@chakra-ui/react';
import {Sidebar} from "@/components/sidebar/Sidebar.jsx";
import { useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import Navbar from '../navbar/Navbar';
import { Spinner } from '@chakra-ui/react';
export const PageLayout = ({children}) => {

  const {pathname} = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavBar = !user && !loading && pathname !== "/auth";
  const checkingUserAuth = !user && loading;
  if(checkingUserAuth) return <PageLayoutSpinner/>
  return (
    <Flex flexDirection={canRenderNavBar ? "column" : "row"}>
        {canRenderSidebar? (
          <Box h={"100vh"} w={{base:"100px", md:"240px",lg:"300px"}}>
            <Sidebar/>
          </Box>
        ) : null}
        {canRenderNavBar? (
          <Navbar position={"fixed"} justifyContent={"center"} w={"full"}/>
        ) : null}
        <Box flex={1} w={{base:"calc(100%-70px", md:"calc(100%-240px)", lg:"calc(100%-300px)"}} mx={canRenderNavBar?"auto":null}>
            {children}
        </Box>
    </Flex>
  )
}


export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Spinner size={"xl"}/>
    </Flex>
  )
}