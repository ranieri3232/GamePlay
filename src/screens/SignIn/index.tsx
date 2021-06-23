import React from 'react';
import {  
  Text, 
  View,
  Image 
} from 'react-native';

import { ButtonIcon } from '../../components/ButtonIcon';
import { styles } from './styles';
import IlustrationImage from '../../assets/illustration.png';
import { useNavigation } from '@react-navigation/native';

export function SignIn() {
  const navigation = useNavigation();
  function handleSingin(){
    navigation.navigate('Home');
  }
  return (
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
        <ButtonIcon 
          title="Entrar com o Discord!"
          onPress={handleSingin}
        />
      </View>
      
    </View>
  );
}
