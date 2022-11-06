import { useEffect, useState } from 'react'
import { Share } from 'react-native'

// @native-base
import { VStack, HStack, useToast } from "native-base"

// @react-navigation
import { useRoute } from '@react-navigation/native'

// components
import {
  Header,
  PoolHeader,
  EmptyMyPoolList,
  Option,
  Loading
} from '../components'
import { Guesses } from '../components/Guesses'

// interfaces
import { PoolCardProps } from '../components/PoolCard'

// api
import { api } from '../utils/axios'

interface RouteParams {
  id: string
}

export function DetailsPool() {
  const [isLoading, setIsLoading] = useState(true)
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>({} as PoolCardProps);
  const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses')

  const toast = useToast()
  const route = useRoute()
  const { id } = route.params as RouteParams

  async function getPoolDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`)

      setPoolDetails(response.data.pool)
    }
    catch (err) {
      console.log(err)

      return toast.show({
        title: 'Não foi possível carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code
    })
  }

  useEffect(() => {
    getPoolDetails()
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {
        poolDetails._count?.participants > 0
          ? (
            <VStack px={5} flex={1}>
              <PoolHeader data={poolDetails} />

              <HStack bg="gray.800" rounded="sm" p={1} mb={5}>
                <Option
                  title='Seus palpites'
                  isSelected={optionSelected === 'guesses'}
                  onPress={() => setOptionSelected('guesses')}
                />
                <Option
                  title='Ranking do grupo'
                  isSelected={optionSelected === 'ranking'}
                  onPress={() => setOptionSelected('ranking')}
                />
              </HStack>

              <Guesses poolId={poolDetails.id} code={poolDetails.code} />
            </VStack>
          ) : <EmptyMyPoolList code={poolDetails.code} />
      }
    </VStack>
  )
}