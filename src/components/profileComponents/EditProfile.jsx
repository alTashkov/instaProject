import { Flex, VStack, Text, Input, HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button"
import { useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAuthStore from "../../store/authStore";
import usePreviewImg from "../../hooks/usePreviewImg";
import useEditProfile from "../../hooks/useEditProfile";
import useShowToast from "../../hooks/useShowToast";

const EditProfile = ({ isOpen, onClose }) => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    bio: "",
  });
  const showToast = useShowToast();
  const {isUpdating,editProfile} = useEditProfile();
  const authUser = useAuthStore((state) => state.user);
  const fileRef = useRef(null);
  const {handleImageChange,selectedFile,setSelectedFile} = usePreviewImg();
  const handleSave = async() => {
    try {
        await editProfile(inputs,selectedFile);
        setSelectedFile(null);
        onClose();
    }
    catch (error) {
        showToast("Error",error.message,"error");
    }
  }
  
  return (
    <DialogRoot
      open={isOpen}
      placement={"top"}
      size={"md"}
      closeOnInteractOutside={true}
    >
      <DialogContent>
        <DialogBody>
          <DialogHeader>
            <Flex
              flexDir={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <DialogTitle fontSize={20}>Edit Profile</DialogTitle>
              <Button
                bg={"transparent"}
                color={"white"}
                fontWeight={"bold"}
                fontSize={18}
                onClick={onClose}
              >
                x
              </Button>
            </Flex>
          </DialogHeader>
          <VStack w={"full"}>
            <Flex
              justifyContent={"space-between"}
              w={"full"}
              alignItems={"center"}
              padding={10}
              pt={2}
            >
              <Avatar border={"2px solid white"} h={"100px"} w={"100px"} src={selectedFile || authUser.profilePicURL}></Avatar>
              <Button borderRadius={10} w={"60%"} onClick={()=>fileRef.current.click()} loading={isUpdating}>
                Edit profile picture
              </Button>
              <Input type="file" hidden ref={fileRef} onChange={handleImageChange}/>
            </Flex>
            <VStack w={"full"} gap={7} pb={10}>
              <Flex flexDir={"column"} gap={2} w={"90%"}>
                <Text>Full Name</Text>
                <Input
                  placeholder={"Change your full name.."}
                  value={inputs.fullName || authUser.fullName}
                  onChange={(e) =>
                    setInputs({ ...inputs, fullName: e.target.value })
                  }
                ></Input>
              </Flex>
              <Flex flexDir={"column"} gap={2} w={"90%"}>
                <Text>Username</Text>
                <Input
                  placeholder={"Change your username.."}
                  value={inputs.username || authUser.username}
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                ></Input>
              </Flex>
              <Flex flexDir={"column"} gap={2} w={"90%"}>
                <Text>Bio</Text>
                <Input
                  placeholder={"Enter a new bio.."}
                  value={inputs.bio || authUser.bio}
                  onChange={(e) =>
                    setInputs({ ...inputs, bio: e.target.value })
                  }
                ></Input>
              </Flex>
            </VStack>
            <HStack w={"50%"} pl={10} pr={10} justifyContent={"center"} gap={5}>
              <Button
                p={5}
                w={"70%"}
                bg={"transparent"}
                border={"1px solid gray"}
                color={"white"}
                fontWeight={"bold"}
                fontSize={18}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                p={5}
                w={"70%"}
                bg={"white"}
                border={"1px solid black"}
                color={"black"}
                fontWeight={"bold"}
                fontSize={18}
                onClick={handleSave}
              >
                Save
              </Button>
            </HStack>
          </VStack>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default EditProfile;
