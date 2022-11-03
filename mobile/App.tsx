// @native-base
import { NativeBaseProvider, StatusBar } from "native-base"

// @expo
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'

// providers
import { AuthContextProvider } from './src/contexts/AuthContext'

// screens
import { SignIn } from './src/screens/SignIn'
import { NewPool } from './src/screens/NewPool'
import { FindPool } from './src/screens/FindPool'
import { Pools } from './src/screens/Pools'

// components
import { Loading } from './src/components/Loading'

// styles
import { THEME } from './src/utils/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {fontsLoaded ? <SignIn /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}