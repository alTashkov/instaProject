import React, { useState, useRef } from "react";
import {
  Flex,
  Image,
  Button,
  Input,
  Text,
  Textarea,
  Span,
} from "@chakra-ui/react";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { fireStore, storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Create = () => {
  const [isOpen, setIsOpen] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const hiddenFileInput = useRef(null);
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { isLoading, handleCreatePost } = useCreatePost();
  const showToast = useShowToast();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleRef = () => {
    hiddenFileInput.current.click(); // Trigger file input click
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Set selected file as a Blob
    }
  };

  const removeImage = () => {
    setSelectedFile(null); // Reset the selected image
  };

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selectedFile, caption);
      handleOpen();
      setCaption(""); // Reset caption
      setSelectedFile(null); // Reset selected file
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      <DialogRoot open={isOpen} size={"lg"}>
        <DialogContent borderRadius={5}>
          <DialogBody>
            <DialogHeader>
              <Flex
                w={"full"}
                justifyContent={"space-between"}
                p={0}
                alignItems={"center"}
              >
                <DialogTitle>New post</DialogTitle>
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

            {!selectedFile && (
              <Flex
                justifyContent={"center"}
                gap={7}
                w={"full"}
                alignSelf={"center"}
                alignItems={"center"}
              >
                <Button
                  color={"white"}
                  onClick={handleRef}
                  bg={"blue.500"}
                  borderRadius={5}
                  _hover={{ bg: "whiteAlpha.700" }}
                >
                  Upload a file
                </Button>
                <Text fontSize={15}>Choose a file to upload</Text>
              </Flex>
            )}

            {selectedFile && (
              <Flex
                mt={5}
                w={"full"}
                position={"relative"}
                justifyContent={"center"}
              >
                <Image src={URL.createObjectURL(selectedFile)} alt="selectedImage" />
                <Button
                  pl={5}
                  top={2}
                  position={"absolute"}
                  right={2}
                  p={0}
                  fontSize={20}
                  color={"white"}
                  bg={"transparent"}
                  alignSelf={"flex-end"}
                  onClick={removeImage}
                >
                  x
                </Button>
              </Flex>
            )}

            <Input
              type="file"
              onChange={handleFileChange}
              ref={hiddenFileInput}
              hidden
            ></Input>

            <Flex justifyContent={"center"}>
              <Textarea
                placeholder={"Post caption..."}
                mt={6}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                height={"15vh"}
                width={"70vw"}
              />
            </Flex>

            <DialogFooter>
              <Button
                bg={"white"}
                borderRadius={6}
                color={"black"}
                mt={5}
                _hover={{ bg: "whiteAlpha.700" }}
                onClick={handlePostCreation}
                isLoading={isLoading}
              >
                Post
              </Button>
            </DialogFooter>
          </DialogBody>
        </DialogContent>
      </DialogRoot>

      {/* Sidebar link */}
      <Link to={`/${authUser.username}`} cursor={"pointer"} onClick={handleOpen}>
        <Flex
          width={"6.5vw"}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.400" }}
          alignItems={"center"}
        >
          <Image
            _hover={{ base: { bg: "whiteAlpha.400" }, md: null }}
            h={"4vh"}
            src={"/create1.png"} // Sidebar image for 'Create'
            marginRight={3}
          />
          <Span
            display={{ base: "none", lg: "block" }}
            fontSize={{ lg: 16, xl: 18 }}
          >
            Create
          </Span>
        </Flex>
      </Link>
    </>
  );
};

// Move the custom hook outside of the component
function useCreatePost() {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthStore((state) => state.user);
  const addPost = useUserProfileStore((state) => state.addPost);

  const handleCreatePost = async (selectedFile, caption) => {
    if (!selectedFile) throw new Error("Please select an image!");
    setIsLoading(true);
    const newPost = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

    try {
      const postDocRef = await addDoc(
        collection(fireStore, "posts"),
        newPost
      );
      const userDocRef = await doc(fireStore, "users", authUser.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

      // Upload the file directly as a Blob
      await uploadBytes(imageRef, selectedFile); // `selectedFile` is a Blob
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { image: downloadURL });

      newPost.imageURL = downloadURL;

      addPost({ ...newPost, id: postDocRef.id });
      showToast("Yay!", "Post created successfully", "success");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePost };
}

export default Create;
