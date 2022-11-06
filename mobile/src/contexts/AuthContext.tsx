import { createContext, ReactNode, useState, useEffect } from 'react'

// @expo
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

// api
import { api } from '../utils/axios';

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
    clientId: process.env.CLIENTE_ID,
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

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      const response = await api.post('/users', { access_token })

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

      const userInfoResponse = await api.get('/me');

      setUser(userInfoResponse.data.user)
    } 
    catch (err) {
      console.log(err)
      throw err
    } 
    finally {
      setIsUserLoading(false);
    }
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