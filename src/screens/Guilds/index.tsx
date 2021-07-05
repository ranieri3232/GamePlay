import React, {
  useState,
  useEffect
} from "react";

import { FlatList } from "react-native";

import { View } from 'react-native';
import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { styles } from "./styles";

import { Loading} from '../../components/Loading';
import { api } from "../../services/api";

interface Props{
  handleGuildSelect: (guildSelect: GuildProps) => void;
}

export function Guilds({handleGuildSelect} : Props){
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds(){
    const response = await api.get('/users/@me/guilds');
    setGuilds(response.data);
    setLoading(false);
  }
  useEffect(()=> {
    fetchGuilds();
  }, []);

  return (  
    <View style={styles.container}>
      {
        loading?
        <Loading />
        :
        <FlatList
          data={guilds}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Guild 
              data={item}
              onPress={()=>handleGuildSelect(item)}  
            />
          )}
          contentContainerStyle={{paddingBottom: 40}}
          ItemSeparatorComponent={()=> <ListDivider isCentered/>}
          ListHeaderComponent={()=> <ListDivider isCentered/>}
          style={styles.guilds}
        />
        }
    </View>
  );
}