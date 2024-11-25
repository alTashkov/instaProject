/* eslint-disable react/prop-types */
import {
  VStack,
  Image,
  Box,
  Flex,
  Text,
  Span,
  Input,
  Button,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { useRef, useState } from "react";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import Comments from "../profileComponents/Comments";
const PostFooter = ({
  click = false,
  modify = true,
  isProfilePage = false,
  post,
  isComments,
}) => {
  const [clickComment, setClicked] = useState(click);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const { isCommenting, handlePostComment } = usePostComment();
  const [open, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const { userProfile } = useGetUserProfileById(post.createdBy);
  const authUser = useAuthStore((state) => state.user);
  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };
  const handleClick = () => {
    if (modify) {
      setClicked(!clickComment);
    }
  };

  const handleOpenComments = () => {
    setIsOpen(!open);
  };

  return (
    <>
      <Comments isOpen={open} setOpen={handleOpenComments} post={post} />
      <VStack w={"full"} mb={10} gap={2} pt={0} marginTop={"auto"}>
        <Flex justifyContent={"flex-start"} w={"full"}>
          <Image
            onClick={handleLikePost}
            h={9}
            src={!isLiked ? "/heart.png" : "heart2.png"}
          />
          <Image
            onClick={() => {
              handleClick();
              commentRef.current.focus();
            }}
            h={9}
            src={"/comment.png"}
          />
        </Flex>
        <Box w={"full"}>
          <Text fontSize={12} paddingLeft={2} fontWeight={"600"}>
            {likes} likes
          </Text>
        </Box>
        {!isProfilePage && (
          <Flex
            alignSelf={"flex-start"}
            fontSize={12}
            fontWeight={600}
            w={"full"}
            pl={2}
            flexDir={"column"}
            justifyContent={"flex-start"}
          >
            <Flex w={"full"} gap={2}>
              {userProfile?.username}{" "}
              <Span fontWeight={400}>{post.caption}</Span>
            </Flex>
            <Button
              fontSize={12}
              color={"gray"}
              w={"full"}
              bg={"transparent"}
              alignItems={"center"}
              pl={0}
              justifyContent={"flex-start"}
              onClick={handleOpenComments}
              display={isComments ? "none" : "flex"}
            >
              <Text>View all {post.comments.length} comments</Text>
            </Button>
          </Flex>
        )}
        <Flex
          w={"full"}
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          pl={2}
          display={!clickComment ? "none" : "flex"}
        >
          {authUser && (
            <InputGroup
              w="full"
              endElement={
                <Button
                  pe={0}
                  bg={"transparent"}
                  fontSize={"14"}
                  color={"blue.500"}
                  fontWeight={600}
                  cursor={"pointer"}
                  _hover={{ color: "white" }}
                  onClick={handleSubmitComment}
                >
                  Post
                </Button>
              }
            >
              <Input
                variant={"flushed"}
                placeholder={"Add a comment..."}
                fontSize={14}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                loading={isCommenting}
                ref={commentRef}
              />
            </InputGroup>
          )}
        </Flex>
      </VStack>
    </>
  );
};

export default PostFooter;
