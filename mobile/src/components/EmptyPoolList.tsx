import { Center, Row, Text, Pressable } from 'native-base'

import { useNavigation } from '@react-navigation/native'

export function EmptyPoolList() {
  const { navigate } = useNavigation()

  return (
    <Center justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {'\n'} nenhum bolão, que tal
      </Text>

      <Row>
        <Pressable onPress={() => navigate('findPools')} >
          <Text textDecorationLine="underline" color="yellow.500" textDecoration="underline">
            buscar por código
          </Text>
        </Pressable>

        <Text color="white" fontSize="sm" textAlign="center" mx={1}>
          ou
        </Text>

        <Pressable onPress={() => navigate('newPool')}>
          <Text textDecorationLine="underline" color="yellow.500">
            criar um novo
          </Text>
        </Pressable>

        <Text color="white" fontSize="sm" textAlign="center">
          ?
        </Text>
      </Row>
    </Center>
  );
}