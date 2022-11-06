// @native-base
import { Box } from 'native-base'

// @react-navigation
import { NavigationContainer } from '@react-navigation/native'

// hooks
import { useAuth } from '../hooks/useAuth'

// routes
import { AppRoutes } from './app.routes'

// screens
import { SignIn } from '../screens/SignIn'

export function Routes() {
  const { user } = useAuth()

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        {user.name ? <AppRoutes /> : <SignIn />}
      </NavigationContainer>
    </Box>
  )
}