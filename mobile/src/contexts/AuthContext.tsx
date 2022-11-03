import { createContext, ReactNode, useState, useEffect } from 'react'

// @expo
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession();

type UserProps = {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "982494310763-ltu0tk1184p2p4fa1okdtn2q3rmn2bek.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync();
    } 
    catch (err) {
      console.log(err)
      throw err
    } 
    finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(accessToken: string) {
    console.log("Token de autenticação --> ", accessToken)
  }

  useEffect(() => {
    if(response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response]) 

  return (
    <AuthContext.Provider value={{ user, isUserLoading, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}