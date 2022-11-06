import { useState, useEffect, useCallback } from 'react'

// @native-base
import { VStack, Icon, useToast, FlatList } from "native-base"

// @react-navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native'

// @expo
import { Octicons } from '@expo/vector-icons'

// components 
import { Header, Button, PoolCard, EmptyPoolList, Loading } from '../components'

// interfaces
import { PoolCardProps } from '../components/PoolCard'

// api
import { api } from "../utils/axios"

export function Pools() {
  const [isLoading, setIsLoading] = useState(true)
  const [pools, setPools] = useState<PoolCardProps[]>([])

  const { navigate } = useNavigation()
  const toast = useToast();

  useFocusEffect(useCallback(() => {
    getPools()
  }, []))

  async function getPools() {
    try {
      setIsLoading(true)

      const response = await api.get('/pools');
      setPools(response.data.pools)
    }
    catch (err) {
      console.log(err)
      return toast.show({
        title: 'Não foi possível carregar os bolões.',
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
          onPress={() => navigate('findPools')}
        />
      </VStack>
      {
        isLoading ? <Loading /> : (
          <FlatList
            data={pools}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <PoolCard 
                data={item} 
                onPress={() => navigate('detailsPool', {
                  id: item.id
                })}  
              />
            )}
            ListEmptyComponent={() => <EmptyPoolList />}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 10 }}
            px={5}
          />
        )
      }
    </VStack>
  )
}