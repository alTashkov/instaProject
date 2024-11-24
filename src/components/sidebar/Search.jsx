import { useRef } from "react";
import { Flex, Image, Span, Input, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import SuggestedUser from "../suggestedUsers/SuggestedUser";
import { useState } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading, getUserProfile, setUser } = useSearchUser();
  const searchRef = useRef(null);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleSearch = (e) => {
    console.log("SearchRef:",searchRef.current.value);
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };
  console.log("User:",user);
  
  return (
    <Flex
      width={"6.5vw"}
      borderRadius={6}
      _hover={{ bg: "whiteAlpha.400" }}
      alignItems={"center"}
      cursor={"pointer"}
    >
      <DialogRoot open={isOpen} placement={"top"} size={"md"}>
        <DialogContent pr={"2"} pl={"2"} borderRadius={10}>
          <DialogBody>
            <DialogHeader>
              <Flex
                w={"full"}
                justifyContent={"space-between"}
                p={0}
                alignItems={"center"}
              >
                <DialogTitle>Search for a user</DialogTitle>
                <Button
                  pl={5}
                  p={0}
                  fontSize={20}
                  color={"white"}
                  bg={"transparent"}
                  alignSelf={"flex-end"}
                  onClick={handleOpen}
                >
                  x
                </Button>
              </Flex>
            </DialogHeader>
            <form onSubmit={handleSearch}>
                <Flex w={"full"}>
                  <InputGroup
                    flex="1"
                    startElement={<Image src="/search.png" h={5} />}
                  >
                    <Input placeholder="Username" ref={searchRef} />
                  </InputGroup>
                </Flex>
              <DialogFooter pb={0}>
                <Flex w="full" mt={5} justifyContent={"flex-end"}>
                  <Button
                    type={"submit"}
                    loading={isLoading}
                    bg={"white"}
                    borderRadius={6}
                    _hover={{ bg: "whiteAlpha.600" }}
                  >
                    Search
                  </Button>
                </Flex>
              </DialogFooter>
            </form>
            
            {user &&<Flex w={"full"} justifyContent={"center"} mt={3}>
                <SuggestedUser user={user} setUser={setUser} p={0}/>
            </Flex> }
          </DialogBody>
        </DialogContent>
      </DialogRoot>
      <Flex alignItems={"center"} onClick={handleOpen}>
        <Image h={"4vh"} src={"/search.png"} marginRight={3} />

        <Span display={{ base: "none", lg: "block" }} fontSize={18}>
          Search
        </Span>
      </Flex>
    </Flex>
  );
};

export default Search;
