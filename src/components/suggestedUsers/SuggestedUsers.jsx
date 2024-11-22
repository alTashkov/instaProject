import React from 'react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import { VStack } from '@chakra-ui/react'

const SuggestedUsers = () => {
  return (
    <VStack alignItems={"flex-start"}>
        <SuggestedHeader username={"FinalProject"} img={"/avat.png"}/>
        <SuggestedUser username={"benMarcus"} img={"/avat2.png"} followers={"14.3K"}/>
        <SuggestedUser username={"MichaelGray"} img={"/avat3.png"} followers={"1.2K"}/>
        <SuggestedUser username={"Lorra Holmes"} img={"/avat4.png"} followers={"12K"}/>
        <SuggestedUser username={"Cat Videos"} img={"/avat5.png"} followers={"123.4K"}/>
    </VStack>
  )
}

export default SuggestedUsers