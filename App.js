import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import CategoryScreen from './src/screens/CategoryScreen';
import DrugInCategoryScreen from './src/screens/DrugInCategoryScreen';
import DrugDetailScreen from './src/screens/DrugDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= "Categories">
        <Stack.Screen name = "Categories" component = {CategoryScreen} options={{title: 'Drugs', headerTitleAlign: 'left',}}/>
        <Stack.Screen name =  "Drug List" component = {DrugInCategoryScreen} options={{headerTitle: '', headerBackTitle: 'Drugs in Category',}}/>
        <Stack.Screen name = "Drug Details" component = {DrugDetailScreen} options = {{headerTitle: '',headerBackTitle: 'Drug Details'}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

