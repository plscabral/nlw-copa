// @native-base
import { NativeBaseProvider, StatusBar } from "native-base"

// @expo
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'

// providers
import { AuthContextProvider } from './src/contexts/AuthContext'

// routes
import { Routes } from './src/routes'

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

        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}