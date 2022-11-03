// @native-base
import { VStack, Heading, Text } from "native-base"

// components
import { Header, Input, Button } from "../components"

// assets
import Logo from "../assets/logo.svg"

export function NewPool() {
  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          fontSize="xl"
          color="white"
          textAlign="center"
          my={8}
        >
          Crie seu próprio bolão da copa {'\n'}
          e compartilhe entre amigos
        </Heading>

        <Input placeholder="Qual o nome do seu bolão?" mb={2} />

        <Button title="Criar meu bolão" />

        <Text
          color="gray.200"
          fontSize="sm"
          textAlign="center"
          px={10}
          mt={4}
        >
          Após criar seu bolão, você receberá um código único 
          que poderá usar para convidar {'\n'}
          outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}