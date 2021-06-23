import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "../Avatar";
import {styles } from './styles';

export function Profile(){
  return (
    <View style={styles.container}>
      <Avatar urlImage="https://github.com/ranieri3232.png"/>
      <View>
        <View style={styles.user}>
          <Text style={styles.greetings}>
            Óla,
          </Text>
          <Text style={styles.username}>
            Fulustreko
          </Text>

        </View>
        <Text style={styles.message}>
          Hoje é dia de Vitória!
        </Text>
      </View>
    </View>
  );

}