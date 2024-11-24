import React from "react";
import Search from "./Search";
import Home from "./Home";
import Profile from "./Profile";
import Notifications from "./Notifications";
import Create from "./Create";
import Logout from "./Logout";
import { VStack, Box } from "@chakra-ui/react";
import SidebarImage from "./SidebarImage";

const SidebarComponents = () => {
  return (
    <VStack
      spacing={10}
      alignItems={{ base: "center", sm: "flex-start" }}
      width={{base:"20vw",sm:"18vw",md:"16vw"}}
      borderRight={"1px solid gray"}
      h={"100vh"}
      position={"fixed"}
      padding={10}
    >
      <SidebarImage/>
      <Home />
      <Search />
      <Notifications />
      <Create />
      <Profile />
      <Logout/>
    </VStack>
  );
};

export default SidebarComponents;
