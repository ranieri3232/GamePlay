import React from 'react';
import {  
  Text, 
  View,
  Image,
   ActivityIndicator
} from 'react-native';

import { Background } from '../../components/Background';

import { ButtonIcon } from '../../components/ButtonIcon';
import { styles } from './styles';
import IlustrationImage from '../../assets/illustration.png';
import { useAuth } from '../../hooks/auth';
import { Alert } from 'react-native';
import { theme } from '../../global/styles/theme';

export function SignIn() {

  const {user, signIn, loading} = useAuth();

  async function handleSingin(){
    try{
      await signIn();
    }catch(error){
      Alert.alert(error);
    }
  }
  return (
    <Background>
      <View style={styles.container}>
        
        <Image
          source={IlustrationImage}
          style={styles.image}
          resizeMode="stretch"
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {'\n'}
            e organize suas {'\n'}
            jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {'\n'}
            favoritos com seus amigos 
          </Text>
          {loading? 
          <ActivityIndicator color={theme.colors.primary}/>
          : 
          <ButtonIcon 
            title="Entrar com o Discord!"
            onPress={handleSingin}
          />}
        </View>
      </View>
    </Background>
  );
}
