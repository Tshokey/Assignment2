import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";

import CategoryScreen from './src/screens/CategoryScreen';
import DrugInCategoryScreen from './src/screens/DrugInCategoryScreen';
import DrugDetailScreen from './src/screens/DrugDetailScreen';
import LearningList from "./src/screens/LearningList";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function DrugStack() {
  return (
    <Stack.Navigator initialRouteName= "Categories">
        <Stack.Screen name = "Categories" component = {CategoryScreen} options={{title: 'Drugs', headerTitleAlign: 'left',}}/>
        <Stack.Screen name =  "Drug List" component = {DrugInCategoryScreen} options={{headerTitle: '', headerBackTitle: 'Drugs in Category',}}/>
        <Stack.Screen name = "Drug Details" component = {DrugDetailScreen} options = {{headerTitle: '',headerBackTitle: 'Drug Details'}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  const currentCount = useSelector(state => state.learning.current.length);

  return (
    <NavigationContainer>
      <Tabs.Navigator>
        <Tabs.Screen 
        name ="Drugs" 
        component={DrugStack}
        options={{
          tabBarIcon: ({size, color}) => (
            <Ionicons name="medkit" size={size} color={color} />
          ),
        }} />
        <Tabs.Screen 
        name ="Learning" 
        component={LearningList} 
        options={{
          tabBarIcon: ({ size, color}) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarBadge: currentCount > 0 ? currentCount : null,
        }}/>
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

