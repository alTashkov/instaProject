import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import { VStack } from '@chakra-ui/react'

const SuggestedUsers = () => {
  return (
    <VStack alignItems={"flex-start"}>
        <SuggestedHeader/>
        <SuggestedUser user={"tester123"}/>
        <SuggestedUser user={"tester123"}/>
        <SuggestedUser user={"tester123"}/>
        <SuggestedUser user={"tester123"}/>
    </VStack>
  )
}

export default SuggestedUsers