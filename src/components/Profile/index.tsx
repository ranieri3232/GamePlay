import React from "react";

import { RectButton } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { useAuth } from "../../hooks/auth";
import { Avatar } from "../Avatar";
import {styles } from './styles';


interface Props{
  openLoggoutModal: () => void; 
}

export function Profile({openLoggoutModal} : Props){
  const {user} = useAuth();
  return (
    <View style={styles.container}>
      <RectButton onPress={openLoggoutModal}>
        <Avatar urlImage={user.avatar}/>
      </RectButton>
      <View>
        <View style={styles.user}>
          <Text style={styles.greetings}>
            Óla,
          </Text>
          <Text style={styles.username}>
            {user.firstName}
          </Text>
        </View>
        <Text style={styles.message}>
          Hoje é dia de Vitória!
        </Text>
      </View>
    </View>
  );

}