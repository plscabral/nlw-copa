// @native-base
import { VStack, Icon } from "native-base"

// @expo
import { Octicons } from '@expo/vector-icons'

// components 
import { Header, Button } from '../components'

export function Pools() {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Meus bolões" />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="Buscar bolão por código"
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
        />

      </VStack>

    </VStack>
  )
}