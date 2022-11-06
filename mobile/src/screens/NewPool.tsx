import { useState } from 'react'

// @native-base
import { VStack, Heading, Text, useToast } from "native-base"

// components
import { Header, Input, Button } from "../components"

// assets
import Logo from "../assets/logo.svg"

// api
import { api } from "../utils/axios"

export function NewPool() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast()

  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    try {
      setIsLoading(true)

      await api.post('/pools', { title: title.toUpperCase() })

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

      setTitle('')
    }
    catch (err) {
      console.log(err)

      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    finally {
      setIsLoading(false)
    }
  }

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

        <Input
          mb={2}
          placeholder="Qual o nome do seu bolão?"
          onChangeText={setTitle}
          value={title}
        />

        <Button
          title="Criar meu bolão"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />

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