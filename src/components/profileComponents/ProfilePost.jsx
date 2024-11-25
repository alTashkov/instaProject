import { useState, useMemo, useEffect } from "react";
import { GridItem, Flex, Text, Image, Button, Span, Separator } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { DialogBody, DialogContent, DialogRoot } from "@/components/ui/dialog";
import PictureComment from "./PictureComment";
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { deleteObject, ref } from "firebase/storage";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { fireStore } from "../../firebase/firebase";
import usePostStore from "../../store/postStore";
import { storage } from "../../firebase/firebase";
import { deleteDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import Caption from "./Caption";
const ProfilePost = ({ post }) => {
  const [isOpen, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null); // State for user profile
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();
  const deletePost = usePostStore((state) => state.deletePost);
  const decreasePostCount = useUserProfileStore((state) => state.deletePost);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch user profile once when post is loaded
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRef = doc(fireStore, "users", post.createdBy);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };

    if (post.createdBy) {
      fetchUserProfile();
    }
  }, [post.createdBy, showToast]);
  
  const memoizedComments = useMemo(() => post.comments, [post.comments]);

  const handleOpen = () => {
    setOpen(!isOpen);
  };

  const [isHover, setIsHover] = useState(false);
  const handleIsHover = () => {
    setIsHover(!isHover);
  };

  const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);

      const userRef = doc(fireStore, "users", authUser.uid);
      await deleteDoc(doc(fireStore, "posts", post.id));
      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });
      decreasePostCount(post.id);
      deletePost(post.id);
      showToast("Success", "Post deleted successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <GridItem
        onClick={handleOpen}
        cursor={"pointer"}
        borderRadius={4}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
      >
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={"blackAlpha.700"}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          <Flex justifyContent={"center"} alignItems={"center"} gap={50}>
            <Flex alignItems={"center"}>
              <Image src={"/heart.png"} h={"40px"} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Image src={"/comment.png"} h={"40px"} />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Image
          src={post.image}
          alt="profilePost"
          w={"full"}
          h={"100%"}
          objectFit={"cover"}
          alignSelf={"center"}
        />
      </GridItem>
      <DialogRoot
        open={isOpen}
        placement={"center"}
        size={{ base: "md", md: "xl" }}
      >
        <DialogContent>
          <DialogBody overflowY={{ base: "scroll", md: "hidden" }}>
            <Flex
              flexDirection={{ base: "column", md: "row" }}
              w={"100%"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                height={{ base: "50%", sm: "50%", md: "100%" }}
                w={{ base: "full", md: "50%" }}
                alignSelf={"center"}
              >
                <Image
                  pt={3}
                  borderRadius={10}
                  src={post.image}
                  w={"full"}
                ></Image>
              </Flex>
              <VStack
                w={{ base: "full", md: "50%" }}
                maxBlockSize={{
                  base: "60vH",
                  sm: "50vH",
                  md: "40vH",
                  lg: "80vH",
                  xl: "55vH",
                }}
              >
                <Flex
                  justifyContent={"space-between"}
                  width={"85%"}
                  alignItems={"center"}
                  flexDir={"row"}
                  padding={5}
                  pb={15}
                  mb={2}
                  mt={2}
                  height={"15%"}
                  borderBottom={"1px solid"}
                  borderColor={"whiteAlpha.400"}
                  flexWrap={"wrap"}
                >
                  <Flex alignItems={"center"}>
                    {userProfile && (
                      <Avatar src={userProfile.profilePicURL}></Avatar>
                    )}
                    <Span ml={"20px"} fontWeight={"bold"} fontSize={15}>
                      {userProfile?.username}
                    </Span>
                  </Flex>
                  <Flex alignSelf={"flex-end"}>
                    {authUser?.uid === userProfile?.uid && (
                      <Button
                        ml={"auto"}
                        alignSelf={"flex-end"}
                        bg={"transparent"}
                        color={"white"}
                        fontSize={20}
                        p={0}
                        fontWeight={"bold"}
                        onMouseEnter={handleIsHover}
                        onMouseLeave={handleIsHover}
                        onClick={handleDeletePost}
                        loading={isDeleting}
                      >
                        <Image
                          h={7}
                          src={isHover ? "/deleteRed.png" : "/delete.png"}
                        />
                      </Button>
                    )}
                    <Button
                      ml={"auto"}
                      onClick={handleOpen}
                      alignSelf={"flex-end"}
                      bg={"transparent"}
                      p={0}
                      color={"white"}
                      fontSize={20}
                      fontWeight={"bold"}
                    >
                      x
                    </Button>
                  </Flex>
                </Flex>
                <Flex
                  height={"65%"}
                  alignItems={"center"}
                  flexDirection={"column"}
                  justifyContent={"flex-start"}
                  w={"full"}
                  overflowY={"scroll"}
                  mt={2}
                >
                  {post.caption && <Caption post={post}/>}
                  {memoizedComments.map((comment) => (
                    <PictureComment key={comment.id} comment={comment} userProfile={userProfile} />
                  ))}
                </Flex>
                <Separator w={"90%"} alignSelf={"center"}/>
                <Flex
                  pl={{ base: 5, md: 3 }}
                  mb={0}
                  pt={5}
                  maxH={"25%"}
                  w={"full"}
                  alignSelf={"flex-start"}
                  mt={"auto"}
                >
                  <PostFooter
                    pb={10}
                    isProfilePage={true}
                    modify={false}
                    click={true}
                    post={post}
                  />
                </Flex>
              </VStack>
            </Flex>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default ProfilePost;
