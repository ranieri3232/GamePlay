import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from './styles';
import { categories } from '../../utils/categories';
import { Category } from '../Category';

interface Props {
  categorySelected: string;
  setCategory: (categoryId : string) => void;  
  hasCheckBox?: boolean, 
}
export function CategorySelect({categorySelected, setCategory, hasCheckBox=false}: Props){
  return(
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingRight: 40}}
    >
      {
        categories.map(category => (
          <Category
            hasCheckBox={hasCheckBox}
            key={category.id}
            title={category.title}
            icon={category.icon}
            checked={category.id === categorySelected}
            onPress={() => setCategory(category.id)}
          />
        ))
      }
    </ScrollView>
  );
}