import React from 'react';
import { Text, View, FlatList, StyleSheet} from 'react-native';
import DrugItem from '../components/DrugItem';
import {drugData} from '../../resources/resource';

export default function DrugInCategoryScreen({ route, navigation }) {

  const { category} = route.params;
  
  const drugs = drugData.filter(drug => drug.categories.includes(category.id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name}</Text>
      <FlatList
        data={drugs}
        keyExtractor={(item) =>item.id.toString()}
        renderItem={({item})=>(
          <DrugItem
            name={item.name}
            onPress={() => navigation.navigate('Drug Details', {drug: item})}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
    padding: 10,
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
