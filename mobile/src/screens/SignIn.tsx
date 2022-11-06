// @native-base
import { Center, Icon, Text } from 'native-base'

// @expo
import { Fontisto } from '@expo/vector-icons'

// components
import { Button } from '../components'

// assets
import Logo from '../assets/logo.svg'

// hooks
import { useAuth } from '../hooks/useAuth'

export function SignIn() {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bg="gray.900" p={7}>
      <Logo width={212} height={40} />

      <Button
        type="SECONDARY"
        title="Entrar com google"
        leftIcon={<Icon as={Fontisto} name="google" color="white" />}
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{
          _spinner: { color: 'white' }
        }}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
}