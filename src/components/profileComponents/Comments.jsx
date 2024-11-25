import {
  DialogBody,
  DialogContent,
  DialogRoot,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Flex } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import PostFooter from "../FeedPosts/PostFooter";
import { Separator } from "@chakra-ui/react";
import PictureComment from "./PictureComment";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import Caption from "./Caption";
const Comments = ({ isOpen, setOpen, post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  return (
    <DialogRoot open={isOpen} size={"md"}>
      <DialogContent>
        <DialogBody>
          <DialogHeader>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <DialogTitle>Comments</DialogTitle>
              <Button
                pl={5}
                p={0}
                fontSize={20}
                color={"white"}
                bg={"transparent"}
                alignSelf={"flex-end"}
                onClick={setOpen}
              >
                x
              </Button>
            </Flex>
          </DialogHeader>
          <Separator w={"90%"} alignSelf={"center"} />
          <Flex
            height={"65%"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            w={"full"}
            overflowY={"scroll"}
            mt={3}
          >
            {post.caption && <Caption post={post} />}
            {post.comments.map((comment,idx) => (
              <PictureComment
                key={idx}
                comment={comment}
                userProfile={userProfile}
              />
            ))}
          </Flex>
          <Separator w={"90%"} alignSelf={"center"} mb={3} />
          <PostFooter isComments={true} post={post} />
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default Comments;
