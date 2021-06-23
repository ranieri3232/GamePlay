import React from 'react';
import { 
  View,
  Image,
  Text
} from 'react-native';
import DiscordImg from '../../assets/discord.png';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
interface Props extends RectButtonProps{
  title: string;
}
export function ButtonIcon({title , ...rest}: Props){
  return (
    <RectButton 
      style={styles.container} 
      {...rest}
    >
      <View style={styles.iconWrapper}>
        <Image 
          style={styles.icon}
          source={DiscordImg}
        />
      </View>
      <Text style={styles.title}>
        Entrar com o Discord!
      </Text>
    </RectButton>     
  );
}