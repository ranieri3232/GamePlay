import React from "react";
import { FlatList } from "react-native";

import { View } from 'react-native';
import { GuildProps } from "../../components/Appointment";
import { Guild } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { styles } from "./styles";

interface Props{
  handleGuildSelect: (guildSelect: GuildProps) => void;
}

export function Guilds({handleGuildSelect} : Props){
  const guilds = [
    {
      id: '1',
      name: 'Lendários',
      icon: 'alo',
      owner: true
    },
    {
      id: '2',
      name: 'Lendários',
      icon: 'alo',
      owner: true
    }
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Guild 
            data={item}
            onPress={()=>handleGuildSelect(item)}  
          />
        )}
        ItemSeparatorComponent={()=> <ListDivider/>}
        style={styles.guilds}
      />
    </View>
  );
}