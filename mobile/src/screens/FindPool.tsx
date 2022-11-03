// @native-base
import { VStack, Heading } from "native-base"

// components
import { Header, Input, Button } from "../components"

export function FindPool() {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          fontSize="xl"
          color="white"
          textAlign="center"
          my={8}
        >
          Encontre um bolão através de {'\n'}
          seu código único
        </Heading>

        <Input placeholder="Qual o código do bolão?" mb={2} />

        <Button title="Buscar bolão" />
      </VStack>
    </VStack>
  )
}