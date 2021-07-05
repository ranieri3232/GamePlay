import React, { useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { Profile } from '../../components/Profile';
import { styles } from './styles';
import { ListHeader  } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import ListDivider from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Loading } from '../../components/Loading';
import { COLLECTION_APPOINTMENTS, COLLECTION_USERS } from '../../configs/database';
import { useEffect } from 'react';
import { LoggoutModal } from '../../components/LoggoutModal';
import { useAuth } from '../../hooks/auth';


export function Home(){
  const [category, setCategory] = useState('');
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggoutModal, setLoggoutModal] = useState(false);

  const { signOut } = useAuth();

  
  const navigation = useNavigation();

  async function loadAppointments(){
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
    if(category){
      setAppointments(storage.filter(item => item.category === category));
    }else{
      setAppointments(storage);
    }

    setLoading(false);

    
  }
  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [
    category
  ]));
  function handleCategorySelect(categoryId: string){
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleLoggout(){
    signOut();
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps){
    navigation.navigate('AppointmentDetails', {guildSelected});
  }
  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate');
  }
  return (
    <Background>
      <View style={styles.header}>
        <Profile openLoggoutModal={() => {setLoggoutModal(true)}}/>
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
     {
      loading?
      <Loading/>
        :
      <>
        <ListHeader
          title="Partidas agendadas"
          subtitle={`Total ${appointments.length}`}
        />

          
        <FlatList 
          data={appointments}
          keyExtractor={ item => item.id}
          contentContainerStyle={{paddingBottom: 60}}
          renderItem={({item})=> (
            <Appointment 
              data={item}
              onPress={() => handleAppointmentDetails(item)}
            />
          )}
          ItemSeparatorComponent={()=> <ListDivider/>}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
        />
      </>
      }
      {
        loggoutModal?
        <LoggoutModal
          handleCancel={() => {setLoggoutModal(false)}}
          handleConfirm={handleLoggout}
        />
        :
        <></>
      }
    </Background>
  );
}