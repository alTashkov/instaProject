import React, { useEffect, useState } from 'react'
import { Grid, VStack, Box } from '@chakra-ui/react'
import {Skeleton} from '@/components/ui/skeleton';
import ProfilePost from './ProfilePost';
const ProfilePosts = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  },[]);
  return (
    <Grid templateColumns={{
      sm:"repeat(1,1fr)",
      md:"repeat(3,1fr)"
    }} gap={1} columnGap={1}>

      {isLoading && [0,1,2,3,4,5].map((_,idx) => (
        <VStack key={idx} alignItems={"flex-start"} gap={4}>
          <Skeleton w={"full"}>
            <Box h={"350px"}>
              content
            </Box>
          </Skeleton>
        </VStack>
      ) )}
      {!isLoading && (
        <>
          <ProfilePost avatar={"/avat3.png"} username={"al.tashkov"} img={"postImg.png"}/>
          <ProfilePost avatar={"/avat3.png"} username={"al.tashkov"} img={"postImg2.png"}/>
          <ProfilePost avatar={"/avat3.png"} username={"al.tashkov"} img={"postImg.png"}/>
          <ProfilePost avatar={"/avat3.png"} username={"al.tashkov"} img={"postImg2.png"}/>
        </>
      )}
    </Grid>
  )
}

export default ProfilePosts;