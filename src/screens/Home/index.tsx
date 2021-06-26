import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Profile } from '../../components/Profile';
import { styles } from './styles';
import { ListHeader  } from '../../components/ListHeader';
import { Appointment } from '../../components/Appointment';
import ListDivider from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home(){
  const [category, setCategory] = useState('');
  const navigation = useNavigation();

  const appointments = [
    {
      id: '1',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'Ciço de manu vai com tudo pra conseguir o abate'
    },
    {
      id: '2',
      guild: {
        id: '1',
        name: 'Lendários',
        icon: null,
        owner: true
      },
      category: '1',
      date: '22/06 às 20:40h',
      description: 'Ciço de manu vai com tudo pra conseguir o abate'
    },
    
  ];


  function handleCategorySelect(categoryId: string){
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(){
    navigation.navigate('AppointmentDetails');
  }
  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate');
  }
  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      <View style={styles.content}>
        <ListHeader
          title="Partidas agendadas"
          subtitle="total 6"
        />

        <FlatList 
          data={appointments}
          keyExtractor={ item => item.id}
          renderItem={({item})=> (
            <Appointment 
              data={item}
              onPress={handleAppointmentDetails}
            />
          )}
          ItemSeparatorComponent={()=> <ListDivider/>}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Background>
  );
}