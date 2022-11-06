import { useState } from 'react'

// @native-base
import { VStack, Heading, useToast } from "native-base"

// @react-navigation
import { useNavigation } from '@react-navigation/native'

// components
import { Header, Input, Button } from "../components"

// api
import { api } from '../utils/axios'

export function FindPool() {
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  const { navigate } = useNavigation()
  const toast = useToast()

  async function handleJoinPool() {
    try {
      setIsLoading(true)

      if(!code.trim()) {
        return toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      await api.post('/pools/join', { code })

      toast.show({
        title: 'Você entrou no bolão com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      navigate('pools')
    }
    catch (err) {
      console.log(err)
      setIsLoading(false)

      let title = "Erro ao pesquisar bolão";

      if (err.response?.data?.message === 'Pool not found.') {
        title = "Bolão não encontrado!"
      }
      else if (err.response?.data?.message === 'You already joined this pool.') {
        title = "Você já está nesse bolão"
      }

      return toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

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

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          autoCapitalize='characters'
          onChangeText={setCode}
        />

        <Button
          title="Buscar bolão"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  )
}