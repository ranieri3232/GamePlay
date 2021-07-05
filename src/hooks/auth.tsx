import React, {
  Children,
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import { ReactNode } from 'react';

import * as AuthSession from 'expo-auth-session';

import AsyncStorage from '@react-native-async-storage/async-storage';



import { COLLECTION_USERS } from '../configs/database';
const { REDIRECT_URI } = process.env;
const { SCOPE } = process.env;
const { RESPONSE_TYPE } = process.env;
const { CLIENT_ID } = process.env;
const { CDN_IMAGE } = process.env;

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
  signOut: () => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps{
  children: ReactNode;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps ){
  
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  async function signOut(){
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USERS);
  }

  async function signIn(){
    try{
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`
      setLoading(true);
      const { type, params } = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;
      if(type==="success" && !params.error){
        api.defaults.headers.authorization = `Bearer ${params.access_token}`
        const userInfo = await api.get('/users/@me');
        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}`
        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token
        };
        
        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
        setUser(userData);
      }
    }catch{
      throw new Error("Não foi possivel autenticar");
    }finally{
      setLoading(false);
    }
  }
  async function loadUserStorageData(){
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);
    if(storage){
      const userLogged = JSON.parse(storage) as User;
      api.defaults.headers.authorization = `Bearer ${userLogged.token}`
      setUser(userLogged);
    }
  }
  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signOut
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
