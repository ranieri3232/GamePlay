import React from 'react';
import { Text, ImageBackground, View, FlatList } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { BorderlessButton } from 'react-native-gesture-handler';

import bannerImg from '../../assets/banner.png'

import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Member } from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';

export function AppointmentDetails() {
  const menbers = [
    {
      id: '1',
      username: 'Ranieri ',
      avatar_url: 'https://github.com/ranieri3232.png',
      status: 'offline',
    },
    {
      id: '2',
      username: 'Ranieri ',
      avatar_url: 'https://github.com/ranieri3232.png',
      status: 'online',
    }
  ]
  return (
    <Background>  
      <Header 
        title="detalhes"
        action={
          <BorderlessButton>
            <Fontisto
              name='share'
              size={24}
              color={theme.colors.primary}
            />
          </BorderlessButton>
        }  
      />
      <ImageBackground
        source={bannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            Lendários
          </Text>
            
          <Text style={styles.subtitle}>
            É hoje que vamos chegar ao challenger sem perder nenhuma partida da md10. 
          </Text>
        </View>
      </ImageBackground>
      <ListHeader 
        title="Jogadores"
        subtitle="Total 3"
      />
      <FlatList 
        data={menbers}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Member data={item}/>
        )}
        ItemSeparatorComponent={()=> <ListDivider/>}
        style={styles.members}
      />
      <View style={styles.footer}>
        <ButtonIcon 
          title="Entrar na partida!"
        />
      </View>
    </Background>
  );
}
