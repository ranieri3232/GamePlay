import React, {
  Children,
  createContext,
  useContext,
  useState
} from 'react';
import { ReactNode } from 'react';

import * as AuthSession from 'expo-auth-session';

import {
  REDIRECT_URI,
  SCOPE,
  RESPONSE_TYPE,
  CLIENT_ID,
  CDN_IMAGE
} from '../configs';
import { api } from '../services/api';

interface User{
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;

}

interface AuthContextData{
  user: User;
  signIn: () => Promise<void>;  
  loading: boolean;
}

interface AuthProviderProps{
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps ){
  
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function signIn(){
    try{
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      setLoading(true);
      const { type, params } = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;
      if(type==="success"){
        api.defaults.headers.authorization = `Bearer ${params.access_token}`
        const userInfo = await api.get('/users/@me');
        console.log(userInfo);
        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}`
        
        setUser({
          ...userInfo.data,
          firstName,
          token: params.access_token
        });
        setLoading(false);
      }else{
        setLoading(false);
      }
    }catch{
      throw new Error("Não foi possivel autenticar");
    }
  }
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(){
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
