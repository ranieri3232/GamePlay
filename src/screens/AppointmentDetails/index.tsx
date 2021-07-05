import React, {useState, useEffect} from 'react';
import { 
  Text, 
  ImageBackground, 
  View, 
  FlatList, 
  Share,
  Alert,
  Platform
} from 'react-native';

import { Fontisto } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { BorderlessButton } from 'react-native-gesture-handler';

import bannerImg from '../../assets/banner.png'

import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import ListDivider from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';
import { Loading } from '../../components/Loading';

import * as Linking from 'expo-linking';

interface Params{
  guildSelected: AppointmentProps;
};
interface GuildWidget{
  id: string;
  name: string;
  instant_invite: string;
  channels: ChannelsProps[];
  members:MemberProps[];
  presence_count: number;
}

interface ChannelsProps{
  id: string;
  name: string;
  position: number;
}

export function AppointmentDetails() {
  const route = useRoute();

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const { guildSelected } = route.params as Params;

  function handleShareInvitation(){
    const message = Platform.OS === 'ios' 
    ?
    `Junte-se a ${guildSelected.guild.name}`
    : widget.instant_invite;
    if(widget.instant_invite){
      Share.share({
        message,
        url: widget.instant_invite
      });
    }
  }

  function handleOpenGuild(){
    //Linking.openURL(`http://www.discord.com/channels/${guildSelected.guild.id}/778458218728521750`)
    if(widget.instant_invite){
      console.log(widget.instant_invite);
      Linking.openURL(widget.instant_invite);
    }
  }

  async function fetchGuildWidget(){
    try{
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    }catch{
      Alert.alert("Verifique as configurações do servidor. O widget provavelmente está desativado!");
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchGuildWidget();
    
  }, []);
  
  return (
    <Background>  
      <Header 
        title="detalhes"
        action={widget.instant_invite && 
          <BorderlessButton
            onPress={handleShareInvitation}
          >
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
            {guildSelected.guild.name}
          </Text>
            
          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

    { loading?
      <Loading />
      :
      <>
        <ListHeader 
          title="Jogadores"
          subtitle={`Total ${widget.members?.length}`}
        />
        <FlatList 
          data={widget.members}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Member data={item}/>
          )}
          ItemSeparatorComponent={()=> <ListDivider isCentered/>}
          style={styles.members}
        />
      </>
    }

      <View style={styles.footer}>
        <ButtonIcon 
          title="Entrar na partida!"
          onPress={handleOpenGuild}
        />
      </View>
    </Background>
  );
}
