import React from "react";
import { Box, Image } from "@chakra-ui/react";
const SidebarImage = () => {
  return (
    <Box marginBottom={10} overflow={"hidden"}>
      <Image h={{ base: "0", xl: "40px" }} src={"/logo1.png"} />
    </Box>
  );
};

export default SidebarImage;
